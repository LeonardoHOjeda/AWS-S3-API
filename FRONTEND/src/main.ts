/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
/* PrimeVue */
import PrimeVue from 'primevue/config'
import Tailwind from 'primevue/passthrough/tailwind'
import ToastService from 'primevue/toastservice'


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
  faSun,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTriangleExclamation,
  faXmark,
  faCirclePlus,
  faCloudArrowUp,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons'
import { faAws } from '@fortawesome/free-brands-svg-icons'

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
  faSun,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTriangleExclamation,
  faXmark,
  faCirclePlus,
  faCloudArrowUp,
  faDatabase,
  faAws
)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: Tailwind })
app.use(ToastService)
app.mount('#app')
