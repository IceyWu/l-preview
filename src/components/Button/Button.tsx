import { defineComponent, computed } from 'vue'
import { generateClassName } from '../../utils'
import type { ButtonProps } from '../../types/components'
import '../../styles/components/button.css'

export default defineComponent({
  name: 'MButton',
  props: {
    type: {
      type: String as () => ButtonProps['type'],
      default: 'default'
    },
    size: {
      type: String as () => ButtonProps['size'],
      default: 'medium'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const buttonClass = computed(() => generateClassName('m-button', {
      [props.type]: true,
      [props.size]: true,
      disabled: props.disabled
    }))

    return () => (
      <button
        class={buttonClass.value}
        disabled={props.disabled}
      >
        {slots.default?.()}
      </button>
    )
  }
})