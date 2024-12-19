import type { App } from 'vue'
import { Button, Image } from './components'
import './styles/index.css'

export { Button, Image }

export default {
  install: (app: App) => {
    app.component('LButton', Button)
    app.component('LImage', Image)
  }
}

export * from './types/components'