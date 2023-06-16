<template>
  <navbar />
  <form class="m-auto w-full" method="POST" @submit.prevent="modifCategorieDepense">
    <div class="rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="relative z-0 mb-3 w-full group">
            <p>Nom de la dépense</p>
            <input
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="categorieDepense.libelle" id="infos" required />
          </div>
        </div>

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
            Modifier la catégorie
          </button>
          <button
            class="w-1/2 m-2 p-2 text-center text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            :disabled="button" @click="deleteCategorieDepense()">
            Supprimer la dépense
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
  name: "CategorieModif",
  components: {
    navbar,
  },
  watch: {
    depense: {
      handler(val, oldVal) {
        console.log("test")
        this.calculParts();
      },
    }
  },
  data() {
    return {
      idCategorieDepense: null,
      route: useRoute(),
      categorieDepense: {},
      showMessage: false,
      message: "",
    };
  },

  methods: {
    async getCategorieDepense() {
      const response = await fetch(GESTIONDEPENSE_API + "getCategorieDepense/" + this.idCategorieDepense);

      this.categorieDepense = await response.json();
    },

    async modifCategorieDepense() {


      let categorieDepenseData = JSON.stringify(this.categorieDepense);
      const settings = {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: categorieDepenseData,
      };
      const response = await fetch(
        GESTIONDEPENSE_API + "updateCategorieDepense/" + this.idCategorieDepense,
        settings
      );
      if (response.status == 201) {
        this.showMessage = true;
        this.message = "La catégorie a été modifiée";
      }
      else {
        this.showMessage = true;
        this.message = "Une erreur est survenue lors de la modification de la catégorie";
      }

      let reponse = await response.json();
    },

    async deleteCategorieDepense() {

      if (confirm("Êtes-vous sur de supprimer la catégorie ?")) {
        const settings = {
          method: "DELETE",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          GESTIONDEPENSE_API + "deleteCategorieDepense/" + this.categorieDepense._id,
          settings
        );

        let reponse = await response.json();
        this.$router.push("/");
      } else {
        console.log("Deletion cancelled");
      }
    },
  },

  async mounted() {
    this.idCategorieDepense = this.route.params.idCategorieDepense;
    this.getCategorieDepense();
  },
};
</script>
