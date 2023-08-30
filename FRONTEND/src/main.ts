/* eslint-disable @typescript-eslint/consistent-type-assertions */
import primeVueThemeTailwind from './theme/primevue'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
/* PrimeVue */
import PrimeVue from 'primevue/config'
import Tailwind from 'primevue/passthrough/tailwind'
import { usePassThrough } from "primevue/passthrough";

import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice';

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
  faMagnifyingGlass,
  faTrash,
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
  faAws,
  faMagnifyingGlass,
  faTrash
)

const CustomTailwind = usePassThrough(
  Tailwind,
  primeVueThemeTailwind,
  {
      merge: true,             // Used to merge PT options. The default is true.
      useMergeProps: true,    // Whether to use Vue's 'mergeProps' method to merge PT options.
  }
);

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)
app.use(PrimeVue, { unstyled: true, pt: CustomTailwind })
app.use(ToastService)
app.use(ConfirmationService)
app.mount('#app')
