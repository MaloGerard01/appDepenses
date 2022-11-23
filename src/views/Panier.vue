<template>
  <navbar />
  <div class="plat">
    <h1 class="italic text-4xl m-10 text-center">Panier</h1>
    <h2 class="italic text-4xl m-10 text-center">Total : {{ total }} €</h2>
    <div
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
    >
      <div v-for="(plat, index) in plats">
        <div class="h-full rounded overflow-hidden shadow-lg relative">
          <img class="w-auto" src="../assets/hamburger-0.jpg" alt="Mountain" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ plat.nom }}</div>
            <div class="font-bold text-l mb-2">{{ plat.type }}</div>
            <p
              class="text-gray-700 text-base"
              v-for="(aliment, index) in plat.aliments"
            >
              {{ aliment.nom }}
            </p>
          </div>
          <div class="flex items-center justify-center mt-16">
            <button
              class="bottom-0 absolute w-96 m-2 p-2 text-center text-black text-base border-2 border-red-500"
              @click="removeFromPanier(index)"
              type="button"
            >
              Supprimer plat
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <button
        class="w-96 m-2 p-2 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        @click="achatPanier()"
        type="button"
      >
        Passer commande
      </button>
    </div>

    <div
      v-if="openModal"
      class="flex items-center justify-center fixed sticky bottom-0 pb-16"
    >
      <div :class="[erreur ? errorModalClass : validModalClass]">
        <h2 v-if="!erreur" class="text-white">Votre commande a été validée</h2>
        <h2 v-if="erreur" class="text-white">
          Une erreur {{ errorCode }} est survenue
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
var RESTAURATION_API = "http://localhost:3000/";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from "@/components/navbar.vue";

export default {
  name: "Panier",
  components: {
    navbar,
  },
  data() {
    return {
      total: 0,
      plats: {},
      validModalClass: "rounded-lg border-4 border-green-500 p-4 bg-green-500",
      errorModalClass: "rounded-lg border-4 border-red-500 p-4 bg-red-500",
      openModal: false,
      erreur: false,
      errorCode: "NaN",
    };
  },

  methods: {
    async getPanier() {
      let panier = cookies.get("panier");
      console.log(panier);
      if (
        panier != [] &&
        panier != undefined &&
        panier != null &&
        panier != ""
      ) {
        let panierParsed = JSON.parse(panier);
        this.plats = panierParsed;
        this.plats.forEach((plat) => (this.total += plat.prix));
      }
    },

    async removeFromPanier(idPlat) {
      console.log(idPlat);
      this.plats.splice(idPlat, 1);
      let panierJSON = JSON.stringify(this.plats);
      console.log(panierJSON);
      cookies.set("panier", panierJSON, "30min");
      this.getPanier();
    },

    async achatPanier() {
      let panierJSON = JSON.stringify(this.plats);
      console.log(panierJSON);
      const settings = {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: panierJSON,
      };
      console.log(settings);
      const response = await fetch(RESTAURATION_API + "achatPlats", settings);
      console.log(response);
      this.openModal = true;
      var self = this;

      if (response.status == 200) {
        setTimeout(function () {
          self.openModal = false;
          self.plats = null;
          self.total = 0;
        }, 2000);

        cookies.remove("panier");
        this.erreur = false;
      } else {
        this.erreur = true;
        this.errorCode = response.status;
      }
    },
  },

  async mounted() {
    this.getPanier();
  },
};
</script>
