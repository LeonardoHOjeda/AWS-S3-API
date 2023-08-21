import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faIndustry,
  faChevronDown,
  faFileLines,
  faChartPie,
  faPlus,
  faPen,
  faList,
  faBuilding,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faIndustry,
  faChevronDown,
  faFileLines,
  faChartPie,
  faPlus,
  faPen,
  faList,
  faBuilding,
  faMoon,
  faSun
)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
