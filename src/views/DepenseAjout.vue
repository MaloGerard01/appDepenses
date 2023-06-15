<template>
  <navbar />
  <form class="mt-10 w-full" method="POST" @submit.prevent="ajoutDepense">
    <div class="overflow-hidden">
      <div class="px-6 py-4">
        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="relative z-0 mb-3 w-full group">
            <p>Nom de la dépense</p>
            <input
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="depense.libelle" required />

          </div>
          <div class="relative z-0 mb-3 w-full group">
            <p>Catégorie</p>
            <select
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="depense.categorie" required>
              <option v-bind:key="categorieDepense" v-for="categorieDepense in categoriesDepense"
                :value="categorieDepense._id">
                {{ categorieDepense.libelle }}
              </option>
            </select>
          </div>


        </div>

        <h2 class="m-3">Pour qui était la dépense :</h2>
        <div class="text-gray-700 text-base" v-bind:key="index" v-for="(user, index) in depense.paiementConcerne">
          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 mb-3 w-full group">
              <input
                class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                v-model="user.nom" disabled />
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <button class="text-red-500 font-bold py-3 px-4 border border-black rounded w-50"
                @click="deleteUserConcerne(index)" type="button">
                X
              </button>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="relative z-0 mb-3 w-full group">

            <select
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="nvUserConcerne">
              <option v-bind:key="user" v-for="user in users" :value="user">
                {{ user.nom }}
              </option>
            </select>
          </div>
          <div class="relative z-0 mb-3 w-full group">
            <button class="text-green-500 font-bold py-3 px-4 border border-black rounded w-50" @click="addUserConcerne()"
              type="button">
              +
            </button>
          </div>


        </div>

        <h2 class="m-3">Total</h2>
        <input
          class="h-12 appearance-none block w-50 bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
          type="number" v-model="depense.total" id="infos" />
        <div class="relative z-0 mb-3 mt-3 w-full group" v-if="showMessage">
          <p
            class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{ message }}
          </p>
        </div>
        <div class="flex items-center justify-center mt-16">
          <button
            class="w-1/2 m-2 p-2 text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="submit" :disabled="button">
            Ajouter la dépense
          </button>
        </div>


      </div>
    </div>
  </form>
</template>

<script>
var GESTIONDEPENSE_API = "http://localhost:3000/";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from "@/components/navbar.vue";

export default {
  name: "DepenseAjout",
  components: {
    navbar,
  },
  data() {
    return {
      route: useRoute(),
      depense: {
        idUser: "",
        libelle: "",
        categorie: "",
        total: 0,
        paiementConcerne: [],
        date: "",
      },
      users: {},
      categoriesDepense: {},
      showMessage: false,
      message: "",
      nvUserConcerne: {
        nom: "",
        _id: "",
      },
    };
  },

  methods: {
    async getUsers() {
      const response = await fetch(GESTIONDEPENSE_API + "getUsers");

      this.users = await response.json();
    },

    async getCategoriesDepense() {
      const response = await fetch(GESTIONDEPENSE_API + "CategoriesDepense");

      this.categoriesDepense = await response.json();
    },

    async ajoutDepense() {

      let depenseData = JSON.stringify(this.depense);
      const settings = {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: depenseData,
      };

      console.log(this.depense);
      if (this.depense.paiementConcerne.length != 0) {
        const response = await fetch(GESTIONDEPENSE_API + "insertDepense/", settings);

        if (response.status == 201) {
          this.showMessage = true;
          this.message = "La dépense a bien été ajoutée";
        }
        else {
          this.showMessage = true;
          this.message = "Une erreur est survenue lors de l'ajout de la dépense";
        }

        let reponse = await response.json();
      }
      else {
        this.showMessage = true;
        this.message = "Veuillez ajouter au moins un utilisateur concerné";
      }




    },

    getUserIdInJWT() {
      var token = cookies.get("tokenJWT");
      if (token != undefined && token != null && token != "undefined") {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        this.depense.idUser = JSON.parse(jsonPayload).userId;
      }
      else {
        console.log("not connected")
      }
    },

    deleteUserConcerne(idUser) {
      this.depense.paiementConcerne.splice(idUser, 1);
    },

    addUserConcerne() {
      if (
        this.nvUserConcerne != "" &&
        this.nvUserConcerne != null
      ) {
        let newUserConcerne = { nom: "", _id: "" };
        this.showMessage = false;
        newUserConcerne.nom = this.nvUserConcerne.nom;
        newUserConcerne._id = this.nvUserConcerne._id;
        console.log(newUserConcerne);
        this.depense.paiementConcerne.push(newUserConcerne);
        console.log(this.depense);
      } else {
        this.showMessage = true;
        this.message = "Valeurs incorrectes";
      }
    },
  },

  async mounted() {
    this.getUsers();
    this.getCategoriesDepense();
    this.getUserIdInJWT();
  },
};
</script>
