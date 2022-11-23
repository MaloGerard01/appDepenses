import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Plat from '../views/Plat.vue'
import Panier from '../views/Panier.vue'
import Admin from '../views/Admin.vue'
import AdminPlat from '../views/AdminPlat.vue'
import AdminPlatModif from '../views/AdminPlatModif.vue'
import AdminPlatAjout from '../views/AdminPlatAjout.vue'
import AdminAliment from '../views/AdminAliment.vue'
import AdminAlimentAjout from '../views/AdminAlimentAjout.vue'

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Plat
  },
  {
    path: '/menus',
    name: 'Menus',
    component: Menu
  },

  // {
  //   path: '/plats',
  //   name: 'Plats',
  //   component: Plat
  // },
  {
    path: '/panier',
    name: 'Panier',
    component: Panier
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/adminplat',
    name: 'AdminPlat',
    component: AdminPlat,
    beforeEnter: (to, from) => {
      console.log(cookies.get('tokenJWT'));
      if(cookies.get("tokenJWT") == null || cookies.get("tokenJWT") == undefined || cookies.get("tokenJWT") == "undefined")
      {
        return { name: 'Home' }
      }      
    },
  },
  {
    path: '/adminplatModif/:idPlat',
    name: 'AdminPlatModif',
    component: AdminPlatModif,
    beforeEnter: (to, from) => {
      console.log(cookies.get('tokenJWT'));
      if(cookies.get("tokenJWT") == null || cookies.get("tokenJWT") == undefined || cookies.get("tokenJWT") == "undefined")
      {
        return { name: 'Home' }
      }      
    },
  },
  {
    path: '/adminplatajout',
    name: 'AdminPlatAjout',
    component: AdminPlatAjout,
    beforeEnter: (to, from) => {
      console.log(cookies.get('tokenJWT'));
      if(cookies.get("tokenJWT") == null || cookies.get("tokenJWT") == undefined || cookies.get("tokenJWT") == "undefined")
      {
        return { name: 'Home' }
      }      
    },
  },
  {
    path: '/adminaliment',
    name: 'AdminAliment',
    component: AdminAliment,
    beforeEnter: (to, from) => {
      console.log(cookies.get('tokenJWT'));
      if(cookies.get("tokenJWT") == null || cookies.get("tokenJWT") == undefined || cookies.get("tokenJWT") == "undefined")
      {
        return { name: 'Home' }
      }      
    },
  },
  {
    path: '/adminalimentajout',
    name: 'AdminAlimentAjout',
    component: AdminAlimentAjout,
    beforeEnter: (to, from) => {
      console.log(cookies.get('tokenJWT'));
      if(cookies.get("tokenJWT") == null || cookies.get("tokenJWT") == undefined || cookies.get("tokenJWT") == "undefined")
      {
        return { name: 'Home' }
      }      
    },
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },