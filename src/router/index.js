import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import(/* webpackChunkName: "invoices" */ '../views/InvoiceList.vue')
  },
  {
    path: '/invoice-details/:id',
    name: 'Invoice',
    props: route => ({ ...route.params, id: route.params.id }),
    component: () => import(/* webpackChunkName: "invoices" */ '../views/InvoiceDetailsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
