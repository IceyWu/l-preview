import type { App } from 'vue'
import { Button, Image,ImageMetaPanel } from './components'
import './styles/index.css'

export { Button, Image,ImageMetaPanel }

export default {
  install: (app: App) => {
    app.component('LButton', Button)
    app.component('LImage', Image)
    app.component('LImageMetaPanel', ImageMetaPanel)
  }
}

export * from './types/components'