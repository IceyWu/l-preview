<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import LPImage from "@/components/Image/LPImage.tsx";
import type { ImageProps } from "@/types/components";
import "@/styles/components/image.css";
import ImageMetaPanel from "./ImageMetaPanel.vue";
import { isArray, isEmpty } from "@iceywu/utils";

const { data, src,initialIndex=0 } = defineProps<ImageProps>();
const images = computed(() => {
  if (isEmpty(src)) {
    return isArray(data) ? data : [data];
  } else {
    const tempObj = {
      file: src,
      exif: {},
    };
    return [tempObj];
  }
});


const isVisible = ref(false);
const scale = ref(1);
const rotation = ref(0);
const loading = ref(false);
const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const startPosition = ref({ x: 0, y: 0 });
const imageRef = ref<HTMLImageElement | null>(null);
const currentIndex = ref(initialIndex || 0);
// 监听initialIndex
watch(() => initialIndex, (val) => {
  currentIndex.value = val;
});

// 图片缩放
const zoom = (delta: number) => {
  const newScale = Math.max(0.1, Math.min(5, scale.value + delta));

  if (imageRef.value) {
    // 获取预览区域的尺寸
    const containerWidth = window.innerWidth * 0.9;
    const containerHeight = window.innerHeight * 0.9;

    // 计算新的缩放尺寸
    const scaledWidth = imageRef.value.naturalWidth * newScale;
    const scaledHeight = imageRef.value.naturalHeight * newScale;

    // 计算新的最大移动范围
    const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);

    // 等比例调整当前位置
    const scaleRatio = newScale / scale.value;
    const newX = position.value.x * scaleRatio;
    const newY = position.value.y * scaleRatio;

    // 确保位置在新的范围内
    position.value = {
      x: Math.max(-maxX, Math.min(maxX, newX)),
      y: Math.max(-maxY, Math.min(maxY, newY)),
    };
  }

  scale.value = newScale;
};

// 图片旋转
const rotate = () => {
  rotation.value = (rotation.value + 90) % 360;
};

// 重置状态
const reset = () => {
  scale.value = 1;
  rotation.value = 0;
  position.value = { x: 0, y: 0 };
};

// 显示预览
const showPreview = () => {
  isVisible.value = true;
  loading.value = true;
};

// 关闭预览
const closePreview = () => {
  isVisible.value = false;
  reset();
};

// 键盘事件处理
const handleKeydown = (e: KeyboardEvent) => {
  if (!isVisible.value) return;

  switch (e.key) {
    case "Escape":
      closePreview();
      break;
    case "+":
    case "=":
      zoom(0.1);
      break;
    case "-":
      zoom(-0.1);
      break;
    case "r":
      rotate();
      break;
  }
};
const naturalWidth = ref(0);
const naturalHeight = ref(0);
// 图片加载完成
const handleImageLoad = (e: {
  naturalWidth: number;
  naturalHeight: number;
}) => {
  naturalWidth.value = e.naturalWidth;
  naturalHeight.value = e.naturalHeight;
  loading.value = false;
};

// 添加滚轮事件处理函数
const handleWheel = (e: WheelEvent) => {
  if (!isVisible.value) return;

  // 阻止默认滚动行为
  e.preventDefault();

  // 根据滚轮方向决定缩放方向
  // deltaY 为正表示向下滚动(缩小)，为负表示向上滚动(放大)
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  zoom(delta);
};

// 开始拖动
const handleDragStart = (e: MouseEvent) => {
  isDragging.value = true;
  startPosition.value = {
    x: e.clientX - position.value.x || 0,
    y: e.clientY - position.value.y || 0,
  };
};

// 拖动中
const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value || !imageRef.value) return;

  // 获取预览区域的尺寸
  const containerWidth = window.innerWidth * 0.9; // 90vw
  const containerHeight = window.innerHeight * 0.9; // 90vh

  // 获取图片原始尺寸
  const imgWidth = naturalWidth.value;
  const imgHeight = naturalHeight.value;
  // 计算图片在当前缩放下的实际尺寸
  const scaledWidth = imgWidth * scale.value;
  const scaledHeight = imgHeight * scale.value;

  // 计算可移动的最大范围
  // 如果缩放后的尺寸小于容器，则不允许移动
  // 如果大于容器，则可以移动超出部分的一半
  const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
  const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);

  // 计算新位置
  const newX = e.clientX - startPosition.value.x;

  const newY = e.clientY - startPosition.value.y;

  // 限制移动范围
  position.value = {
    x: Math.max(-maxX, Math.min(maxX, newX)),
    y: Math.max(-maxY, Math.min(maxY, newY)),
  };
};

// 结束拖动
const handleDragEnd = () => {
  isDragging.value = false;
};

// 切换到下一张图片，增加循环功能
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value?.length; // 循环到第一张
  resetImageState();
};

// 切换到上一张图片，增加循环功能
const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value?.length) % images.value?.length; //
  resetImageState();
};
// 重置缩放和位置状态
const resetImageState = () => {
  scale.value = 1; // 重置缩放
  position.value = { x: 0, y: 0 }; // 重置位置
  rotation.value = 0; // 重置旋转
  isDragging.value = false; // 重置拖动状态
  startPosition.value = { x: 0, y: 0 }; // 重置拖动起始位置
  isDragging.value = false; // 重置拖动状态
};

// 注册和清理键盘事件监听
onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("mousemove", handleDrag);
  window.addEventListener("mouseup", handleDragEnd);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("mousemove", handleDrag);
  window.removeEventListener("mouseup", handleDragEnd);
});
</script>

<template>
  <LPImage
    v-bind="$attrs"
    :data="images[currentIndex]"
    style="height: 100%; width: 100%"
    isShowOrigin
    @click="showPreview"
  />

  <!-- 使用 Teleport 包装预览遮罩层 -->
  <Teleport to="body">
    <div v-if="isVisible" class="preview-overlay" @wheel.prevent="handleWheel">
      <!-- 加载动画 -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      <!-- 预览图 -->
      <LPImage
        ref="imageRef"
        :data="images[currentIndex]"
        :alt="alt"
        class="preview-image"
        isShowOrigin
        v-bind="{
          scale: scale,
          rotation: rotation,
          position: position,
          isDragging: isDragging,
        }"
        @imageLoaded="handleImageLoad"
        @mousedown.prevent="handleDragStart"
      />

      <!-- 图片元信息面板 -->
      <template v-if="isNeedMetaPanel && !isEmpty(images[currentIndex].exif)">
        <slot name="meta" >
          <ImageMetaPanel :data="images[currentIndex]">
            <template #location>
              <slot :data="images[currentIndex]" name="location"> </slot>
            </template>
            <template #more>
              <slot :data="images[currentIndex]"  name="more"> </slot>
            </template>
          </ImageMetaPanel>
        </slot>
      </template>

      <!-- 控制按钮 -->
      <div class="controls">
        <button @click="prevImage" title="上一张">←</button>
        <button @click="nextImage" title="下一张">→</button>
        <button @click="zoom(0.1)" title="放大">+</button>
        <button @click="zoom(-0.1)" title="缩小">-</button>
        <button @click="rotate" title="旋转">↻</button>
        <button @click="reset" title="重置">↺</button>
        <button @click="closePreview" title="关闭">×</button>
      </div>
    </div>
  </Teleport>
</template>
