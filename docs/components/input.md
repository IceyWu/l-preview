# Input 输入框

基础表单输入组件。

## 基础用法

```vue
<template>
  <m-input v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 绑定值 | string | - |
| placeholder | 占位提示 | string | - |
| disabled | 是否禁用 | boolean | false |
| type | 输入框类型 | 'text' \| 'password' \| 'email' | 'text' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 输入值改变时触发 | (value: string) |