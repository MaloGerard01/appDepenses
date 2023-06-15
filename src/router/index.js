import { createRouter, createWebHistory } from 'vue-router'

import Depenses from '../views/Depenses.vue'
import Equilibres from '../views/Equilibres.vue'
import DepenseAjout from '../views/DepenseAjout.vue'
import DepenseModif from '../views/DepenseModif.vue'
import Utilisateurs from '../views/Utilisateurs.vue'
import UtilisateurAjout from '../views/UtilisateurAjout.vue'
import Categories from '../views/Categories.vue'
import CategorieAjout from '../views/CategorieAjout.vue'
import CategorieModif from '../views/CategorieModif.vue'
import Connexion from '../views/Connexion.vue'


import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Depenses
  },
  {
    path: '/equilibres',
    name: 'Equilibres',
    component: Equilibres
  },
  {
    path: '/ajoutDepense',
    name: 'ajoutDepense',
    component: DepenseAjout
  },
  {
    path: '/modificationDepense/:idDepense',
    name: 'modificationDepense',
    component: DepenseModif
  },
  {
    path: '/utilisateurs',
    name: 'Utilisateurs',
    component: Utilisateurs
  },
  {
    path: '/ajoutUtilisateur',
    name: 'ajoutUtilisateur',
    component: UtilisateurAjout
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/ajoutCategorie',
    name: 'ajoutCategorie',
    component: CategorieAjout
  },
  {
    path: '/modificationCategorie/:idCategorieDepense',
    name: 'modificationCategorie',
    component: CategorieModif
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router