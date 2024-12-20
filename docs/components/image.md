# Image 图片

用于展示图片的组件，支持模糊加载和 Live Photo 模式。

## 基础用法

```vue
<template>
  <Image :src="imgInfo.url" :data="imgInfo" alt="示例图片" />
</template>

<script setup>
import { ref } from 'vue'
import { Image } from 'l-preview' 
import 'l-preview/dist/style.css'

const imgInfo = ref({
  "file": "https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965193523.JPEG",
  "fileType": "IMAGE",
  "thumbnail": "https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965193523.JPEG?x-oss-process=image/resize,l_500"
 "blurhash": "LA8%6~xttUg500XTf-oe_LjYada}",
  "videoSrc": "https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965199299.MOV",
})
</script>
```

## API

### Props

| 参数         | 说明                           | 类型    | 默认值           |
| ------------ | ------------------------------ | ------- | ---------------- |
| data         | 图片数据对象                   | Object  | -                |
| isShowOrigin | 是否直接展示原图               | boolean | false            |
| delay        | 加载延时                       | number  | 1000             |
| mode         | 加载模式（blurhash 或 normal） | string  | 'blurhash'       |
| isLive       | 是否开启 Live Photo 模式       | boolean | false            |
| position     | 图片位置                       | Object  | '{ x: 0, y: 0 }' |
| scale        | 图片缩放比例                   | number  | 1                |
| rotation     | 图片旋转角度                   | number  | 0                |
| isDragging   | 是否拖拽中                     | boolean | false            |

### Events

| 事件名      | 说明               | 回调参数                                          |
| ----------- | ------------------ | ------------------------------------------------- |
| imageLoaded | 图片加载完成时触发 | '{ naturalWidth: number, naturalHeight: number }' |
