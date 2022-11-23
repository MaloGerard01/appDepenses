<template>
  <navbar />
  <form class="m-auto w-full" method="POST" @submit.prevent="modifPlat">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-80" src="../assets/hamburger-0.jpg" alt="" />
      <div class="px-6 py-4">
        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="relative z-0 mb-3 w-full group">
            <p>Nom du plat</p>
            <input
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="plat.nom"
              id="infos"
            />
          </div>
          <div class="relative z-0 mb-3 w-full group">
            <p>Type</p>
            <select
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="plat.type"
            >
              <option value="Entrée">Entrées</option>
              <option value="Principal">Principal</option>
              <option value="Dessert">Desserts</option>
              <option value="Boisson">Boissons</option>
            </select>
          </div>
        </div>
        <h2 class="m-3">Composition</h2>
        <div
          class="text-gray-700 text-base"
          v-for="(aliment, index) in plat.aliments"
        >
          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 mb-3 w-full group">
              <input
                class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                v-model="aliment.nom"
                id="infos"
              />
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <input
                class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                type="number"
                v-model="aliment.quantite"
                id="infos"
              />
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <button
                class="text-red-500 font-bold py-3 px-4 border border-black rounded w-50"
                @click="deleteAliment(index)"
                type="button"
              >
                X
              </button>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="relative z-0 mb-3 w-full group">
            <select
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              v-model="nvAliment"
            >
              <option v-for="aliment in aliments" :value="aliment">
                {{ aliment.nom }}
              </option>
            </select>
          </div>
          <div class="relative z-0 mb-3 w-full group">
            <input
              class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
              type="number"
              placeholder="Quantité"
              v-model="nvAliment.quantite"
              id="infos"
            />
          </div>
          <div class="relative z-0 mb-3 w-full group">
            <button
              class="text-green-500 font-bold py-3 px-4 border border-black rounded w-50"
              @click="addAliment()"
              type="button"
            >
              +
            </button>
          </div>


        </div>

        <h2 class="m-3">Prix</h2>
        <input
          class="h-12 appearance-none block w-50 bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
          type="number"
          v-model="plat.prix"
          id="infos"
        />
        <div class="relative z-0 mb-3 w-full group" v-if="showMessage">
            <p
              class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {{ message }}
            </p>
          </div>
        <div class="flex items-center justify-center mt-16">
        <button
          class="w-1/2 m-2 p-2 text-center text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="submit"
          :disabled="button"
        >
          Modifier plat
        </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
var RESTAURATION_API = "http://localhost:3000/";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from "@/components/navbar.vue";

export default {
  name: "AdminPlatModif",
  components: {
    navbar,
  },
  data() {
    return {
      idPlat: null,
      route: useRoute(),
      plat: {},
      aliments: {},
      showMessage: false,
      message: "",
      nvAliment: {
        nom: "",
        quantite: null,
      },
    };
  },

  methods: {
    async getPlat() {
      const response = await fetch(RESTAURATION_API + "getPlat/" + this.idPlat);

      this.plat = await response.json();
      console.log(this.plat);
    },

    async getAliments() {
      const response = await fetch(RESTAURATION_API + "aliments/");

      this.aliments = await response.json();
      console.log(this.aliments);
    },

    async modifPlat() {
      console.log(this.plat);

      let tokenJWT = cookies.get("tokenJWT");
      console.log(tokenJWT);

      let platData = JSON.stringify(this.plat);
      console.log(platData);
      const settings = {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Basic " + tokenJWT,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: platData,
      };
      console.log(settings);
      const response = await fetch(
        RESTAURATION_API + "updatePlat/" + this.idPlat,
        settings
      );
      console.log(response)
      if(response.status == 201)
      {
        this.showMessage = true;
        this.message = "Le plat a été modifié";
      }
      else
      {
        this.showMessage = true;
        this.message = "Une erreur est survenue lors de l'ajout du plat";
      }

      let reponse = await response.json();
      console.log(reponse);
    },

    deleteAliment(idAliment) {
      console.log(this.plat.aliments[idAliment]);
      this.plat.aliments.splice(idAliment, 1);
    },

    addAliment() {
      console.log(this.nvAliment);
      if (
        this.nvAliment.nom != "" &&
        this.nvAliment.quantite != 0 &&
        this.nvAliment.quantite != null
      ) {
        let newAliment = { nom: "", quantite: "", _id: "" };
        this.showMessage = false;
        newAliment._id = this.nvAliment._id;
        newAliment.nom = this.nvAliment.nom;
        newAliment.quantite = this.nvAliment.quantite;
        console.log(newAliment);
        this.plat.aliments.push(newAliment);
        console.log(this.plat.aliments);
      } else {
        console.log("incorrect");
        this.showMessage = true;
        this.message = "Valeurs incorrectes";
      }
    },
  },

  async mounted() {
    this.idPlat = this.route.params.idPlat;
    this.getPlat();
    this.getAliments();
  },
};
</script>
