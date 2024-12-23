import {
  defineComponent,
  computed,
  onMounted,
  ref,
  nextTick,
  watch,
} from "vue";
import { isEmpty } from "@iceywu/utils";
import * as LivePhotosKit from "livephotoskit";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
import { decode } from "blurhash";
import { getDataUrlFromArr } from "./blurhash";

export default defineComponent({
  name: "LPImage",
  props: {
    data: {
      type: Object,
      required: true,
    },
    // 是否直接展示原图
    isShowOrigin: {
      type: Boolean,
      default: false,
    },
    // 加载延时
    delay: {
      type: Number,
      default: 0,
      // default: 1_000,
    },
    // loading模式（blurhash,normal）
    mode: {
      type: String,
      default: "blurhash",
      validator: (value: string) => {
        return ["blurhash", "normal"].includes(value);
      },
    },
    // 是否开启live模式
    isLive: {
      type: Boolean,
      default: true,
    },
    // position
    position: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
        };
      },
    },
    scale: {
      type: Number,
      default: 1,
    },
    rotation: {
      type: Number,
      default: 0,
    },
    isDragging: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs, emit }) {
    // 是否展示原图
    const isShowOrigin = computed(() => {
      return props.isShowOrigin && isLoaded.value;
    });
    // blurhashSrc
    const loadingImgSrc = computed(() => {
      if (props.mode === "blurhash" && !isEmpty(props.data?.blurhash)) {
        return blurhashSrc.value;
      } else if (props.mode === "normal") {
        return props.data?.thumbnail;
      } else {
        return "";
      }
    });
    const isLoaded = ref<boolean>(false);
    const blurhashSrc = ref<string | any>();
    const blurNumber = ref(30);
    const IntervalObj = ref<any>(null);
    function decreaseBlurNumber() {
      if (blurNumber.value > 0) {
        blurNumber.value -= 2;
      } else {
        clearInterval(IntervalObj.value);
      }
    }
    function startDecreaseBlurNumber() {
      if (IntervalObj.value) {
        clearInterval(IntervalObj.value);
      }
      IntervalObj.value = setInterval(() => {
        decreaseBlurNumber();
      }, 10000);
    }
    function getImgUrl(src: string) {
      const fileSuffix = src.substring(src.lastIndexOf("."));
      if (fileSuffix.toUpperCase() === ".HEIC") {
        return `${src}?x-oss-process=image/format,jpg`;
      } else {
        return src;
      }
    }
    function initPreImg() {
      const imgPre = document.createElement("img");
      imgPre.addEventListener("load", () => {
        startDecreaseBlurNumber();
      });
      imgPre.addEventListener("error", () => {});
      imgPre.src = props.data?.thumbnail;
    }

    // 图片加载逻辑
    const loadImage = () => {
      const img = document.createElement("img");
      img.onload = () => {
        setTimeout(() => {
          isLoaded.value = true;
          blurNumber.value = 0;
          clearInterval(IntervalObj.value);
          emit("imageLoaded", {
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
          });
          if (props.isLive && !isEmpty(props.data?.videoSrc)) {
            initLivePhoto();
          }
        }, props.delay);
      };
      img.onerror = () => {
        setTimeout(() => {
          blurhashSrc.value = "";
        }, props.delay);
      };
      img.src = getImgUrl(props.data?.file);

      // 初始化loading模式
      if (props.mode === "blurhash" && !isEmpty(props.data?.blurhash)) {
        const pixels = decode(props.data?.blurhash, 32, 32);
        blurhashSrc.value = getDataUrlFromArr(pixels, 32, 32);
      } else if (props.mode === "normal") {
        initPreImg();
      }
    };

    // 监听 data 属性变化
    watch(
      () => props.data,
      () => {
        isLoaded.value = false; // 重置加载状态
        loadImage(); // 重新加载图片
      },
      { immediate: true }
    );

    onMounted(() => {
      loadImage(); // 初始加载图片
    });

    const placeholderStyle = computed(() => {
      if (props.mode === "blurhash") {
        return props.isShowOrigin
          ? {
              width: "100%",
              height: "100%",
            }
          : {};
      } else if (props.mode === "normal") {
        return {
          filter: `blur(${blurNumber.value}px)`,
        };
      }
    });

    const baseStyle = computed(() => {
      return {
        transform: `translate(${props.position?.x || 0}px, ${
          props.position?.y || 0
        }px) scale(${props.scale || 1}) rotate(${props.rotation || 0}deg)`,
        cursor: props?.isDragging ? "grabbing" : "grab",
        transition: "transform .3s cubic-bezier(.4, 0, .2, 1)",
      };
    });

    const livePhotoRef = ref();
    async function initLivePhoto() {
      await nextTick();

      const player = LivePhotosKit.Player(livePhotoRef.value);
      player.photoSrc = getImgUrl(props.data?.file);
      player.videoSrc = props.data?.videoSrc;
    }

    return () =>
      isShowOrigin.value ? (
        <img
          ref={livePhotoRef}
          src={getImgUrl(props.data?.file)}
          style={baseStyle.value}
          {...attrs}
        />
      ) : (
        <img
          src={loadingImgSrc.value}
          style={placeholderStyle.value}
          {...attrs}
        />
      );
  },
});
