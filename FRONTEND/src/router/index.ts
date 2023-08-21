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
