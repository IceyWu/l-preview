<script lang="ts" setup>
import { ref, computed } from "vue";
import "@/styles/components/image.css";
import { getObjVal, customDestr } from "@iceywu/utils";

// interface MetaDataItem {
//   key: string;
//   label: string;
//   value: string;
// }

const props = defineProps<{
  //   metaData: MetaDataItem[];
  data: {
    exif: any;
  };
}>();

const showMoreInfo = ref(false);

const imgMetaData = computed(() => {
  const info_enum = [
    {
      key: "Model",
      label: "拍摄设备",
      value: "",
      valFormat: (val: string) => {
        return val ?? "--";
      },
    },
    {
      key: "LensModel",
      label: "镜头型号",
      value: "",
      valFormat: (val: string) => {
        return val ?? "--";
      },
    },
    {
      key: "ISOSpeedRatings",
      label: "ISO",
      value: "",
      valFormat: (val: string) => {
        return val ?? "--";
      },
    },
    {
      key: "FocalLengthIn35mmFilm",
      label: "焦距",
      value: "",
      valFormat: (val: string) => {
        return val ?? "--";
      },
    },
    {
      key: "FNumber",
      label: "光圈",
      value: "",
      valFormat: (val: string) => {
        const num = eval(val) || 0;
        return `f/${num?.toFixed(1)}`;
      },
    },
    {
      key: "ShutterSpeedValue",
      label: "快门",
      value: "",
      valFormat: (val: string) => {
        return val ?? "--";
      },
    },
    {
      key: "GPSAltitude",
      label: "海拔",
      value: "",
      valFormat: (val: string) => {
        return val ?? "--";
      },
    },
    {
      key: "DateTimeOriginal",
      label: "拍摄时间",
      value: "",
      valFormat: (val: string) => {
        return val ?? "--";
      },
    },
    {
      key: "location",
      label: "拍摄地点",
      value: "",
      valFormat: (val: string) => {
        return val ?? "未知";
      },
    },
  ];
  const tempData: { [key: string]: string } = {};
  const exifData = customDestr(props.data.exif, { customVal: {} });
  info_enum.forEach((item) => {
    const { valFormat } = item;
    item.value = getObjVal(exifData, item.key, { value: "" })?.value || "";
    tempData[item.key] = valFormat ? valFormat(item.value) : item.value;
  });

  return info_enum;
});

const toggleMoreInfo = () => {
  showMoreInfo.value = !showMoreInfo.value;
};

const getMetaByKey = (key: string) => {
  if(!imgMetaData.value) return { key: "", label: "", value: "" };
  return (
    imgMetaData.value.find((item) => item.key === key) || {
      key: "",
      label: "",
      value: "",
    }
  );
};
</script>
<template>
  <div class="metadata-panel">
    <div class="metadata-header">
      <div class="camera-info">
        <span class="camera-model">{{ getMetaByKey("Model")?.value }}</span>
        <span class="lens-model">{{ getMetaByKey("LensModel")?.value }}</span>
      </div>
    </div>
    <div class="metadata-body">
      <div class="exposure-settings">
        <div class="metadata-item">
          <span class="value">{{
            getMetaByKey("ISOSpeedRatings")?.value
          }}</span>
          <span class="label">{{
            getMetaByKey("ISOSpeedRatings")?.label
          }}</span>
        </div>
        <div class="metadata-item">
          <span class="value">{{ getMetaByKey("FNumber")?.value }}</span>
          <span class="label">{{ getMetaByKey("FNumber")?.label }}</span>
        </div>
        <div class="metadata-item">
          <span class="value">{{
            getMetaByKey("ShutterSpeedValue")?.value
          }}</span>
          <span class="label">{{
            getMetaByKey("ShutterSpeedValue")?.label
          }}</span>
        </div>
      </div>
      <div class="location-info">
        <slot name="location" :data>
          <div class="location">
            <i class="location-icon">📍</i>
            <span>{{ getMetaByKey("location")?.value || "--" }} </span>
          </div>
        </slot>

        <div class="time">
          <i class="time-icon">🕒</i>
          <span>{{ getMetaByKey("DateTimeOriginal")?.value }}</span>
        </div>
      </div>
    </div>
    <button @click="toggleMoreInfo" class="more-info-button">
      {{ showMoreInfo ? "收起信息" : "查看更多信息" }}
    </button>
    <div v-if="showMoreInfo" class="more-info-panel">
      <h4>更多信息</h4>
      <p v-for="item in imgMetaData" :key="item.key">
        {{ item?.label }}: {{ item?.value || "--" }}
      </p>
      <slot name="more" :data></slot>
     
    </div>
  </div>
</template>
