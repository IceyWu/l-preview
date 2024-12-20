<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Image from './components/Image/Image.vue'
const imgInfo = {
    "id": 96,
    "name": "IMG_0198.JPEG",
    "path": "/nestTest/1",
    "type": "image/jpeg",
    "blurhash": "LA8%6~xttUg500XTf-oe_LjYada}",
    "videoSrc": "http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965199299.MOV",
    "fileMd5": "478be5c0f7db58a1552a27126e542ac9",
    "url": "http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965193523.JPEG",
    "size": 191629,
    "userId": 1,
    "createdAt": "2024-04-01T09:53:13.698Z",
    "updatedAt": "2024-12-17T07:06:05.828Z",
    "exif": "{\"ApertureValue\":{\"value\":\"163775/98437\"},\"BrightnessValue\":{\"value\":\"86911/8530\"},\"ColorSpace\":{\"value\":\"65535\"},\"ComponentsConfiguration\":{\"value\":\"1 2 3 0\"},\"CompositeImage\":{\"value\":\"2\"},\"Compression\":{\"value\":\"6\"},\"DateTime\":{\"value\":\"2024:03:30 16:02:07\"},\"DateTimeDigitized\":{\"value\":\"2024:03:30 16:02:07\"},\"DateTimeOriginal\":{\"value\":\"2024:03:30 16:02:07\"},\"ExifTag\":{\"value\":\"244\"},\"ExifVersion\":{\"value\":\"48 50 51 50\"},\"ExposureBiasValue\":{\"value\":\"45664/68633\"},\"ExposureMode\":{\"value\":\"0\"},\"ExposureProgram\":{\"value\":\"2\"},\"ExposureTime\":{\"value\":\"1/4049\"},\"FNumber\":{\"value\":\"89/50\"},\"FileSize\":{\"value\":\"191629\"},\"Flash\":{\"value\":\"16\"},\"FlashpixVersion\":{\"value\":\"48 49 48 48\"},\"FocalLength\":{\"value\":\"343/50\"},\"FocalLengthIn35mmFilm\":{\"value\":\"24\"},\"Format\":{\"value\":\"jpg\"},\"FrameCount\":{\"value\":\"1\"},\"GPSAltitude\":{\"value\":\"671848/1333\"},\"GPSAltitudeRef\":{\"value\":\"0\"},\"GPSDateStamp\":{\"value\":\"2024:03:30\"},\"GPSDestBearing\":{\"value\":\"341294/10221\"},\"GPSDestBearingRef\":{\"value\":\"T\"},\"GPSHPositioningError\":{\"value\":\"310552/74331\"},\"GPSImgDirection\":{\"value\":\"341294/10221\"},\"GPSImgDirectionRef\":{\"value\":\"T\"},\"GPSLatitude\":{\"value\":\"30deg 38' 32.060\\\" \"},\"GPSLatitudeRef\":{\"value\":\"North\"},\"GPSLongitude\":{\"value\":\"104deg 10' 47.510\\\" \"},\"GPSLongitudeRef\":{\"value\":\"East\"},\"GPSSpeed\":{\"value\":\"18223/85548\"},\"GPSSpeedRef\":{\"value\":\"K\"},\"GPSTag\":{\"value\":\"2630\"},\"GPSTimeStamp\":{\"value\":\"8/1 2/1 7/1\"},\"HostComputer\":{\"value\":\"iPhone 15 Pro Max\"},\"ISOSpeedRatings\":{\"value\":\"80\"},\"ImageHeight\":{\"value\":\"1536\"},\"ImageWidth\":{\"value\":\"2048\"},\"JPEGInterchangeFormat\":{\"value\":\"3034\"},\"JPEGInterchangeFormatLength\":{\"value\":\"3058\"},\"LensMake\":{\"value\":\"Apple\"},\"LensModel\":{\"value\":\"iPhone 15 Pro Max back triple camera 6.86mm f/1.78\"},\"LensSpecification\":{\"value\":\"1551800/699009 2052196/131047 1244236/699009 14/5\"},\"Make\":{\"value\":\"Apple\"},\"MakerNote\":{\"value\":\"4389 bytes undefined data\"},\"MeteringMode\":{\"value\":\"5\"},\"Model\":{\"value\":\"iPhone 15 Pro Max\"},\"OffsetTime\":{\"value\":\"+08:00\"},\"OffsetTimeDigitized\":{\"value\":\"+08:00\"},\"OffsetTimeOriginal\":{\"value\":\"+08:00\"},\"Orientation\":{\"value\":\"1\"},\"PixelXDimension\":{\"value\":\"2048\"},\"PixelYDimension\":{\"value\":\"1536\"},\"ResolutionUnit\":{\"value\":\"2\"},\"SceneCaptureType\":{\"value\":\"0\"},\"SceneType\":{\"value\":\"1\"},\"SensingMethod\":{\"value\":\"2\"},\"ShutterSpeedValue\":{\"value\":\"49934/4167\"},\"Software\":{\"value\":\"17.3.1\"},\"SubSecTimeDigitized\":{\"value\":\"924\"},\"SubSecTimeOriginal\":{\"value\":\"924\"},\"SubjectArea\":{\"value\":\"2849 2137 3291 1884\"},\"WhiteBalance\":{\"value\":\"0\"},\"XResolution\":{\"value\":\"72/1\"},\"YCbCrPositioning\":{\"value\":\"1\"},\"YResolution\":{\"value\":\"72/1\"}}",
    "file": "http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965193523.JPEG",
    "fileType": "IMAGE",
    "thumbnail": "http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1711965193523.JPEG?x-oss-process=image/resize,l_500"
}
</script>

<template>
  <div>
    <div style="height: 400px; width: 400px;">
      <Image :src="imgInfo.url" :data="imgInfo"  alt="Vite logo" />
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
