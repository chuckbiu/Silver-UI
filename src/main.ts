import './styles/index.css'
import { createApp } from 'vue'
import myPlugin from './test.plugin'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App2.vue'

/* add icons to the library */
library.add(fas)

// console.log(App.render?.toString())
const app = createApp(App)
app.use(myPlugin)
app.mount('#app')
