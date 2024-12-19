<script setup lang="ts">
import { computed } from 'vue'
import { generateClassName } from '@/utils'
import type { ButtonProps } from '@/types/components'
import '@/styles/components/button.css'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false
})

const buttonClass = computed(() => generateClassName('m-button', {
  [props.type]: true,
  [props.size]: true,
  disabled: props.disabled
}))
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>