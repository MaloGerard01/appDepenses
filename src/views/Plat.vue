<template>
  <navbar />
  <div class="plat">
    <h1 class="italic text-4xl m-10 text-center">Plats</h1>
    <div class="flex items-center justify-center">
      <select
        class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
        v-model="selectedCategory"
      >
        <option value="All">Tous</option>
        <option value="Entrée">Entrées</option>
        <option value="Principal">Principal</option>
        <option value="Dessert">Desserts</option>
        <option value="Boisson">Boissons</option>
      </select>
    </div>
    <div
      class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
    >
      <div v-for="(plat, index) in filteredPlats">
        <div class="h-full rounded overflow-hidden shadow-lg relative">
          <img class="w-auto" src="../assets/hamburger-0.jpg" alt="Mountain" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ plat.nom }}</div>
            <div class="font-bold text-l mb-2">{{ plat.type }}</div>
            <div class="font-bold text-l mb-2">{{ plat.prix }} €</div>
            <p
              class="text-gray-700 text-base"
              v-for="(aliment, index) in plat.aliments"
            >
              {{ aliment.nom }}
            </p>
          </div>
          <div class="flex items-center justify-center mt-16">
            <button
              class="bottom-0 absolute w-96 m-2 p-2 text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              :class="[plat.disponible ? activeClass : errorClass]"
              @click="addToPanier(plat)"
              type="button"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="openModal"
    class="flex items-center justify-center fixed sticky bottom-0 pb-16"
  >
    <div :class="[erreur ? errorModalClass : validModalClass]">
      <h2 v-if="!erreur" class="text-white">
        Le plat {{ nomPlatAjoute }} a été ajouté a votre panier.
      </h2>
      <h2 v-if="erreur" class="text-white">
        Le plat {{ nomPlatAjoute }} n'est plus disponible.
      </h2>
    </div>
  </div>
</template>

<script>
var RESTAURATION_API = "http://localhost:3000";
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
      activeClass: "border-2 border-green-500 bg-green-500",
      errorClass: "border-2 border-red-500 bg-red-500",
      validModalClass: "rounded-lg border-4 border-green-500 p-4 bg-green-500",
      errorModalClass: "rounded-lg border-4 border-red-500 p-4 bg-red-500",
      plats: {},
      selectedCategory: "All",
      nomPlatAjoute: "",
      openModal: false,
      erreur: false,
    };
  },

  methods: {
    async getPlats() {
      const response = await fetch(RESTAURATION_API + "/plats");

      this.plats = await response.json();
      this.plats.forEach(async (plat) => {
        plat.aliments.forEach(async (aliment) => {
          const response = await fetch(
            RESTAURATION_API + "/getAliment/" + aliment._id
          );
          let alimentData = await response.json();
          if (alimentData != null || alimentData != undefined) {
            if (alimentData.stock <= 0) {
              plat.disponible = false;
            } else {
              plat.disponible = true;
            }
          } else {
            plat.disponible = false;
          }
        });
      });
    },

    async addToPanier(plat) {
      this.nomPlatAjoute = plat.nom;
      if (plat.disponible == true) {
        let panierArray = [];
        let panier = cookies.get("panier");
        let panierJSON = "";
        this.erreur = false;
        this.openModal = true;
        var self = this;
        setTimeout(function () {
          self.openModal = false;
        }, 2000);

        if (panier != [] && panier != undefined && panier != null) {
          let panierParsed = JSON.parse(panier);
          panierParsed.push(plat);
          panierJSON = JSON.stringify(panierParsed);
          cookies.set("panier", panierJSON, "30min");
        } else {
          panierArray.push(plat);
          panierJSON = JSON.stringify(panierArray);
          cookies.set("panier", panierJSON, "30min");
        }
      } else {
        this.erreur = true;
        this.openModal = true;
        var self = this;
        setTimeout(function () {
          self.openModal = false;
        }, 2000);
      }
    },
  },

  computed: {
    filteredPlats: function () {
      var vm = this;
      var category = vm.selectedCategory;

      if (category === "All") {
        return vm.plats;
      } else {
        return vm.plats.filter(function (plat) {
          return plat.type === category;
        });
      }
    },
  },

  async mounted() {
    this.getPlats();
  },
};
</script>
