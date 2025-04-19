import type { App } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Message, { createMessage } from '@/components/Message'
import Button from '@/components/Button'
import Collapse, { CollapseItem } from '@/components/Collapse'
import Dropdwon from '@/components/Dropdown'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import Tooltip from '@/components/Tooltip'
import Select from '@/components/Select'
import Switch from '@/components/Switch'

/* import the fontawesome core */

/* import specific icons */

// 样式
import '@/styles/index.css'

/* add icons to the library */
library.add(fas)

const components = [
  Button,
  Collapse,
  CollapseItem,
  Message,
  Dropdwon,
  Icon,
  Input,
  Tooltip,
  Select,
  Switch,
]

function install(app: App) {
  components.forEach((components) => {
    return app.component(components.name as string, components)
  })
}

export {
  Button,
  Collapse,
  CollapseItem,
  createMessage,
  Icon,
  Input,
  install,
  Message,
  Select,
  Switch,
  Tooltip,
}
export default {
  install,
}
