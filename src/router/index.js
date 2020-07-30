import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import addMovie from '../views/AddMovie.vue'
import editMovie from '../views/EditMovie.vue'
import "iview/dist/styles/iview.css";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addMovie',
    name: 'addMovie',
    component: addMovie
  },
  {
    path: '/editMovie/:id',
    name: 'editMovie',
    component: editMovie,
    props:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
