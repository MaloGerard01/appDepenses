<template>
  <navbar />
  <div class="depense">
    <h1 class="italic text-4xl mt-10  text-center">Liste des depenses</h1>
    <h2 v-if="connectedUserId" class="italic text-xl ml-10 mt-2 text-left">Bienvenue {{ getUserById(connectedUserId).nom
    }}</h2>
    <div class="p-10 w-full">
      <ul class=" divide-y divide-gray-200 dark:divide-gray-700" v-bind:key="index" v-for="(depense, index) in depenses">
        <li class="pb-3 my-2 p-4 sm:pb-4 rounded-md bg-gray-200">
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
              <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                {{ depense.libelle }}
              </p>
              <p class="text-base text-gray-500 truncate dark:text-gray-400">
                payé par <span class="font-bold">{{ getUserById(depense.idUser).nom }}</span>
              </p>
              <p v-if="depense.categorie" class="text-base text-gray-500 truncate dark:text-gray-400">
                <span class="font-bold">{{ getCategorieById(depense.categorie).libelle }}</span>
              </p>

            </div>
            <router-link :to="{ path: '/modificationDepense/' + depense._id }" v-if="connectedUserId">
              <p class="m-2 p-2 text-black">
                Modifier
              </p>
            </router-link>
            <div class="inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white">
              {{ depense.total }} €
            </div>
          </div>
        </li>
      </ul>

      <div class="flex items-center justify-center mt-16" v-if="connectedUserId">
        <router-link :to="{ path: '/ajoutDepense' }"
          class="w-1/2 m-2 p-2 text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Ajouter une dépense
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
var GESTIONDEPENSE_API = "http://localhost:3000";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from "@/components/navbar.vue";

export default {
  name: "Home",
  components: {
    navbar,
  },
  data() {
    return {
      depenses: {},
      users: {},
      categoriesDepense: {},
      connectedUserId: null,
      nomDepenseAjoute: "",
    };
  },

  methods: {
    async getUsers() {
      const response = await fetch(GESTIONDEPENSE_API + "/getUsers");

      this.users = await response.json();
      console.log(this.users);
    },

    async getCategoriesDepense() {
      const response = await fetch(GESTIONDEPENSE_API + "/CategoriesDepense");

      this.categoriesDepense = await response.json();
    },

    getUserById(id) {
      let user = this.users.find(item => item._id === id)
      if(user != undefined){
        return user;
      }
      else
      {
        let user = {nom: "User"};
        return user;
      }
      
    },

    getCategorieById(id) {
      return this.categoriesDepense.find(item => item._id === id);
    },

    getUserIdInJWT() {
      var token = cookies.get("tokenJWT");
      if (token != undefined && token != null && token != "undefined") {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        this.connectedUserId = JSON.parse(jsonPayload).userId;
      }
      else {
        console.log("not connected")
      }
    },

    async getDepenses() {
      const response = await fetch(GESTIONDEPENSE_API + "/depenses");

      this.depenses = await response.json();
    },
  },

  async mounted() {
    this.getDepenses();
    await this.getUsers();
    await this.getCategoriesDepense();
    this.getUserIdInJWT();
  },
};
</script>
