import { createApp } from 'vue'
import './style.css'
import 'flowbite'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Layout from './layout/Layout.vue'
import TableUser from './components/TableUser.vue'
import ErrorPage from './components/404Page.vue'
import EditUser from './components/EditUser.vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [{ path: '', component: ErrorPage }],
  },
  {
    path: '/login',
    component: Layout,
    children: [{ path: '', component: Login }],
  },
  {
    path: '/user-list',
    component: Layout,
    children: [
      { path: '', component: TableUser },
      { path: 'edit', component: EditUser },
    ],
  },
  {
    path: '/register',
    component: Layout,
    children: [{ path: '', component: Register }],
  },
  //Error page
  {
    path: '/:notFound',
    component: Layout,
    children: [{ path: '', component: ErrorPage }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
