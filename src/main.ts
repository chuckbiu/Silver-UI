import './styles/index.css'
import { createApp } from 'vue'
// import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'

/* add icons to the library */
library.add(fas)

// console.log(App.render?.toString())
createApp(App)
  .mount('#app')
