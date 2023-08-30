import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: async () => await import('@views/mainMenu.vue'),
    meta: {
      title: 'Menu Principal'
    }
  },
  {
    path: '/tenants',
    component: async () => await import('@views/tenants/HomeTenant.vue'),
    meta: {
      title: 'Tenants'
    }
  },
  {
    path: '/database-files',
    component: async () => await import('@views/files/db/HomeDBFile.vue'),
    meta: {
      title: 'Database Files'
    }
  },
  {
    path: '/aws-files',
    component: async () => await import('@views/files/aws/HomeAwsFile.vue'),
    meta: {
      title: 'AWS Files'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title as string}`
  next()
})

export default router
