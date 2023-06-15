<template>
  <navbar />
  <div class="depense">
    <h1 class="italic text-4xl mt-10  text-center">Liste des catégories</h1>
    <div
      class="p-10 w-full"
    >
      <ul class=" divide-y divide-gray-200 dark:divide-gray-700" v-bind:key="index" v-for="(categorieDepense, index) in categoriesDepense">
        <li class="pb-3 my-2 p-4 sm:pb-4 rounded-md bg-gray-200">
          <div class="flex items-center space-x-4">
          <div class="flex-1 min-w-0">
            <p class="text-base font-medium text-gray-900 truncate dark:text-white">
              {{ categorieDepense.libelle }}
            </p>
          </div>
          <router-link :to="{ path: '/modificationCategorie/' + categorieDepense._id }" v-if="connected">
                  <p
                    class="m-2 p-2 text-black"
                  >
                    Modifier
                </p>
          </router-link>
         </div>
      </li>
  </ul>

  <div class="flex items-center justify-center mt-16" v-if="connected">
    <router-link :to="{ path: '/ajoutCategorie'}" 
          class="w-1/2 m-2 p-2 text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Ajouter une catégorie
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
  name: "Categories",
  components: {
    navbar,
  },
  data() {
    return {
      categoriesDepense: {},
      users: {},
      connected: false,
    };
  },

  methods: {

    getUserIdInJWT(){
      var token = cookies.get("tokenJWT");
      if(token != undefined && token != null && token != "undefined"){
        this.connected = true;
      }
      else {
        console.log("not connected")
      }
    },

    async getCategoriesDepenses() {
      const response = await fetch(GESTIONDEPENSE_API + "/CategoriesDepense");

      this.categoriesDepense = await response.json();
    },
  },

  async mounted() {
    this.getCategoriesDepenses();
    this.getUserIdInJWT();
  },
};
</script>
