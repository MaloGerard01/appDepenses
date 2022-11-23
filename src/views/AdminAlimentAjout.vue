<template>
  <navbar />
  <h1 class="italic text-4xl m-10 text-center">Ajouter un aliment</h1>
  <form
    class="flex justify-center w-full"
    method="POST"
    @submit.prevent="ajoutAliment"
  >
    <div>
      <div class="px-12 py-4">
        <!-- <div class="flex items-center "> -->
        <div class="relative z-0 mb-3 w-full group">
          <p>Nom de l'aliment</p>
          <input
            class="h-12 w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
            v-model="aliment.nom"
          />
        </div>
        <div class="relative z-0 mb-3 w-full group">
          <p>Type</p>
          <input
            class="h-12 w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
            v-model="aliment.type"
          />
        </div>
        <div class="relative z-0 mb-3 w-full group">
          <p>Quantité en stock</p>
          <input
            class="h-12 w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
            v-model="aliment.stock"
          />
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div class=" " v-if="showMessage">
          <p
            class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {{ message }}
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center mt-16">
        <button
          class="w-1/2 m-2 p-2 text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
          :disabled="button"
        >
          Ajouter l'aliment
        </button>
      </div>


    </div>
  </form>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
var RESTAURATION_API = "http://localhost:3000/";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from "@/components/navbar.vue";

export default {
  name: "AdminAlimentAjout",
  components: {
    navbar,
  },
  data() {
    return {
      route: useRoute(),
      aliment: {
        nom: "",
        type: "",
        stock: 0,
      },
      showMessage: false,
      message: "",
    };
  },

  methods: {

    async ajoutAliment() {
      if (
        this.aliment.nom != "" &&
        this.aliment.type != "" &&
        this.aliment.stock != 0
      ) {
        let tokenJWT = cookies.get("tokenJWT");

        let alimentData = JSON.stringify(this.aliment);
        const settings = {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Basic " + tokenJWT,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: alimentData,
        };
        const response = await fetch(
          RESTAURATION_API + "insertAliment",
          settings
        );

        let reponse = await response.json();
        this.showMessage = false;
        this.message = "L'aliment a été ajouté a la base"
      } else {
        this.showMessage = true;
        this.message = "Valeurs incorrectes";
      }
    },

  },
};
</script>
