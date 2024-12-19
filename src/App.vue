<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Image from './components/Image/Image.vue'
const imgInfo = {
    "id": 902,
    "name": "IMG_0133.JPEG",
    "path": "/nestTest/1",
    "type": "image/jpeg",
    "blurhash": "L8Hoau~p0JDP00.7RNIAP0?b?dM~",
    "videoSrc": null,
    "fileMd5": "ae9db5e396a07420b1caafb4434cba59",
    "url": "http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058402998.JPEG",
    "size": 1111276,
    "userId": 1,
    "createdAt": "2024-12-01T13:06:43.748Z",
    "updatedAt": "2024-12-01T13:06:43.782Z",
    "exif": "{\"ApertureValue\":{\"value\":\"163775/98437\"},\"BrightnessValue\":{\"value\":\"85528/12741\"},\"ColorSpace\":{\"value\":\"65535\"},\"ComponentsConfiguration\":{\"value\":\"1 2 3 0\"},\"CompositeImage\":{\"value\":\"2\"},\"Compression\":{\"value\":\"6\"},\"CustomRendered\":{\"value\":\"8\"},\"DateTime\":{\"value\":\"2024:03:16 13:09:26\"},\"DateTimeDigitized\":{\"value\":\"2024:03:16 13:09:26\"},\"DateTimeOriginal\":{\"value\":\"2024:03:16 13:09:26\"},\"ExifTag\":{\"value\":\"244\"},\"ExifVersion\":{\"value\":\"48 50 51 50\"},\"ExposureBiasValue\":{\"value\":\"44942/33711\"},\"ExposureMode\":{\"value\":\"0\"},\"ExposureProgram\":{\"value\":\"2\"},\"ExposureTime\":{\"value\":\"1/173\"},\"FNumber\":{\"value\":\"89/50\"},\"FileSize\":{\"value\":\"1111276\"},\"Flash\":{\"value\":\"16\"},\"FlashpixVersion\":{\"value\":\"48 49 48 48\"},\"FocalLength\":{\"value\":\"343/50\"},\"FocalLengthIn35mmFilm\":{\"value\":\"48\"},\"Format\":{\"value\":\"jpg\"},\"FrameCount\":{\"value\":\"1\"},\"GPSAltitude\":{\"value\":\"1913857/3468\"},\"GPSAltitudeRef\":{\"value\":\"0\"},\"GPSDateStamp\":{\"value\":\"2024:03:16\"},\"GPSDestBearing\":{\"value\":\"145933/2090\"},\"GPSDestBearingRef\":{\"value\":\"T\"},\"GPSHPositioningError\":{\"value\":\"70797/14623\"},\"GPSImgDirection\":{\"value\":\"145933/2090\"},\"GPSImgDirectionRef\":{\"value\":\"T\"},\"GPSLatitude\":{\"value\":\"30deg 30' 20.110\\\" \"},\"GPSLatitudeRef\":{\"value\":\"North\"},\"GPSLongitude\":{\"value\":\"104deg 20' 41.650\\\" \"},\"GPSLongitudeRef\":{\"value\":\"East\"},\"GPSSpeed\":{\"value\":\"30857/23160\"},\"GPSSpeedRef\":{\"value\":\"K\"},\"GPSTag\":{\"value\":\"2612\"},\"GPSTimeStamp\":{\"value\":\"5/1 9/1 25/1\"},\"HostComputer\":{\"value\":\"iPhone 15 Pro Max\"},\"ISOSpeedRatings\":{\"value\":\"64\"},\"ImageHeight\":{\"value\":\"1536\"},\"ImageWidth\":{\"value\":\"2048\"},\"JPEGInterchangeFormat\":{\"value\":\"3016\"},\"JPEGInterchangeFormatLength\":{\"value\":\"10733\"},\"LensMake\":{\"value\":\"Apple\"},\"LensModel\":{\"value\":\"iPhone 15 Pro Max back triple camera 6.86mm f/1.78\"},\"LensSpecification\":{\"value\":\"1551800/699009 2052196/131047 1244236/699009 14/5\"},\"Make\":{\"value\":\"Apple\"},\"MakerNote\":{\"value\":\"4323 bytes undefined data\"},\"MeteringMode\":{\"value\":\"3\"},\"Model\":{\"value\":\"iPhone 15 Pro Max\"},\"OffsetTime\":{\"value\":\"+08:00\"},\"OffsetTimeDigitized\":{\"value\":\"+08:00\"},\"OffsetTimeOriginal\":{\"value\":\"+08:00\"},\"Orientation\":{\"value\":\"1\"},\"PixelXDimension\":{\"value\":\"2048\"},\"PixelYDimension\":{\"value\":\"1536\"},\"ResolutionUnit\":{\"value\":\"2\"},\"SceneCaptureType\":{\"value\":\"0\"},\"SceneType\":{\"value\":\"1\"},\"SensingMethod\":{\"value\":\"2\"},\"ShutterSpeedValue\":{\"value\":\"24509/3298\"},\"Software\":{\"value\":\"17.3.1\"},\"SubSecTimeDigitized\":{\"value\":\"217\"},\"SubSecTimeOriginal\":{\"value\":\"217\"},\"SubjectArea\":{\"value\":\"1867 1535 371 374\"},\"WhiteBalance\":{\"value\":\"0\"},\"XResolution\":{\"value\":\"72/1\"},\"YCbCrPositioning\":{\"value\":\"1\"},\"YResolution\":{\"value\":\"72/1\"}}",
    "file": "http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058402998.JPEG",
    "fileType": "IMAGE",
    "thumbnail": "http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058402998.JPEG?x-oss-process=image/resize,l_500"
}
</script>

<template>
  <div>
    <div style="height: 200px; width: 200px;">
      <Image :src="imgInfo.url" :data="imgInfo" class="logo" alt="Vite logo" />
    </div>
   
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
