<template>
  <navbar />
  <form class="mt-10 w-full" method="POST" @submit.prevent="ajoutUtilisateur">
    <div class="overflow-hidden">
      <div class="px-6 py-4">
        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="relative z-0 mb-3 w-full group">
            <p>Nom</p>
            <input
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="user.nom" required/>

          </div>


        </div>
        <div class="relative z-0 mb-3 w-full group">
          <p>Prénom</p>
          <input
            class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
            v-model="user.prenom" required/>
        </div>

        <div class="relative z-0 mb-3 w-full group">
          <p>Adresse mail</p>
          <input
            class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
            v-model="user.email" required/>
        </div>

        <div class="relative z-0 mb-3 w-full group">
          <p>Mot de passe</p>
          <input
            class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
            type="password" v-model="user.mdp" required/>
        </div>

        <div class="relative z-0 mb-3  mt-3 w-full group" v-if="showMessage">
          <p
            class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{ message }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-16">
          <button
            class="w-1/2 m-2 p-2 text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="submit" :disabled="button">
            Ajouter l'utilisateur
          </button>
        </div>


      </div>
    </div>
  </form>
</template>

<script>
var GESTIONDEPENSE_API = "http://localhost:3000/";
import { useRoute } from "vue-router";
import navbar from "@/components/navbar.vue";

export default {
  name: "DepenseAjout",
  components: {
    navbar,
  },
  data() {
    return {
      route: useRoute(),
      user: {
        prenom: "",
        nom: "",
        mdp: "",
        email: "",
      },
      showMessage: false,
      message: "",
    };
  },

  methods: {

    async ajoutUtilisateur() {

      let userData = JSON.stringify(this.user);
      const settings = {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: userData,
      };



      const response = await fetch(GESTIONDEPENSE_API + "insertUser/", settings);
      if (response.status == 201) {
        this.showMessage = true;
        this.message = "L'utilisateur a bien été ajouté";
      }
      else {
        this.showMessage = true;
        this.message = "Une erreur est survenue lors de l'ajout de l'utilisateur";
      }

      let reponse = await response.json();


    },
  },
};
</script>
