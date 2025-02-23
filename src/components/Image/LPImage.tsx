import {
  defineComponent,
  computed,
  onMounted,
  ref,
  nextTick,
  watch,
} from "vue";
import { getObjVal, isEmpty } from "@iceywu/utils";
import { LivePhotoViewer } from "live-photo";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
import { decode } from "blurhash";
import { getDataUrlFromArr } from "./blurhash";
import { fileParse, type ParseOptions } from "@life-palette/utils";

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
    parseOptions: {
      type: Object,
    },
  },
  setup(props, { slots, attrs, emit }) {
    const paeseOptions: ParseOptions = getObjVal(props, "parseOptions", {});

    let file_handle = fileParse(props.data, paeseOptions);

    // 是否展示原图
    const isShowOrigin = computed(() => {
      return props.isShowOrigin && isLoaded.value;
    });
    // blurhashSrc
    const loadingImgSrc = computed(() => {
      if (props.mode === "blurhash" && !isEmpty(file_handle?.blurhash)) {
        return blurhashSrc.value;
      } else if (props.mode === "normal") {
        return file_handle?.thumbnail;
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
    function getImgUrl(origin: boolean) {
      const { thumbnailUrl, baseSrc } = file_handle;
      return origin ? baseSrc : thumbnailUrl;
    }
    function initPreImg() {
      const imgPre = document.createElement("img");
      imgPre.addEventListener("load", () => {
        startDecreaseBlurNumber();
      });
      imgPre.addEventListener("error", () => {});
      imgPre.src = file_handle?.thumbnail;
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
          if (props.isLive && !isEmpty(file_handle?.videoSrc)) {
            initLivePhoto();
          }
        }, props.delay);
      };
      img.onerror = () => {
        setTimeout(() => {
          blurhashSrc.value = "";
        }, props.delay);
      };
      img.src = getImgUrl(false);

      // 初始化loading模式
      if (props.mode === "blurhash" && !isEmpty(file_handle?.blurhash)) {
        const pixels = decode(file_handle?.blurhash, 32, 32);
        blurhashSrc.value = getDataUrlFromArr(pixels, 32, 32);
      } else if (props.mode === "normal") {
        initPreImg();
      }
    };

    // 监听 data 属性变化
    watch(
      () => props.data,
      () => {
        file_handle = fileParse(props.data, paeseOptions);
        isLoaded.value = false; // 重置加载状态
        loadImage(); // 重新加载图片
      }
      // { immediate: true }
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

      // 检查 livePhotoRef 是否为 null
      if (livePhotoRef.value) {
        new LivePhotoViewer({
          photoSrc: getImgUrl(false),
          videoSrc: file_handle?.videoSrc,
          container: livePhotoRef.value,
          width: "100%",
          height: "100%",
        });
      } else {
        console.error(
          "livePhotoRef is null, cannot initialize LivePhotosKit.Player"
        );
      }
    }

    const renderImgOrigin = () => {
      return props.isLive && !isEmpty(file_handle?.videoSrc) ? (
        <div ref={livePhotoRef} style={baseStyle.value} {...attrs}></div>
      ) : (
        <img
          ref={livePhotoRef}
          src={getImgUrl(true)}
          style={baseStyle.value}
          {...attrs}
        />
      );
    };

    return () => (
      <div style={baseStyle.value}>
        {isShowOrigin.value ? (
          renderImgOrigin()
        ) : (
          <img
            src={loadingImgSrc.value}
            style={placeholderStyle.value}
            {...attrs}
          />
        )}
      </div>
    );
  },
});
