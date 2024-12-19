# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

```vue
<template>
  <m-button>默认按钮</m-button>
  <m-button type="primary">主要按钮</m-button>
  <m-button type="secondary">次要按钮</m-button>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | 'primary' \| 'secondary' \| 'default' | 'default' |
| size | 按钮大小 | 'small' \| 'medium' \| 'large' | 'medium' |
| disabled | 是否禁用 | boolean | false |