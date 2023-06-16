<template>
  <navbar />
  <div class="depense">
    <h1 class="italic text-4xl mt-10  text-center">Liste des utilisateurs</h1>
    <div class="p-10 w-full">
      <ul class=" divide-y divide-gray-200 dark:divide-gray-700" v-bind:key="index" v-for="(user, index) in users">
        <li class="pb-3 my-2 p-4 sm:pb-4 rounded-md bg-gray-200">
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
              <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                {{ user.nom }}
              </p>
            </div>

            <button class="inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white"
              @click="deleteUser(user._id)">
              Supprimer
            </button>
          </div>
        </li>
      </ul>

      <div class="flex items-center justify-center mt-16">
        <router-link :to="{ path: '/ajoutUtilisateur' }"
          class="w-1/2 m-2 p-2 text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Ajouter un utilisateur
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
  name: "Utilisateurs",
  components: {
    navbar,
  },
  data() {
    return {
      users: {},
      connected: false,
    };
  },

  methods: {
    async getUsers() {
      const response = await fetch(GESTIONDEPENSE_API + "/getUsers");

      this.users = await response.json();
      console.log(this.users);
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

    async deleteUser(idUser) {

      if (confirm("Êtes-vous sur de supprimer l'utilisateur ?")) {
        const settings = {
          method: "DELETE",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(
          GESTIONDEPENSE_API + "/deleteUser/" + idUser,
          settings
        );

        let reponse = await response.json();
        this.getUsers();
      } else {
        console.log("Deletion cancelled");
      }
    },
  },

  async mounted() {
    await this.getUsers();
    this.isConnected();
  },
};
</script>
