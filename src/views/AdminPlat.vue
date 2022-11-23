<template>
  <navbar />
  <div class="plat">
    <h1 class="italic text-4xl m-10 text-center">Panel Admin Plats</h1>
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

            <div class="flex items-center justify-center mt-16">
              <div class="bottom-12 absolute w-5/6">
                <router-link :to="{ path: '/adminplatModif/' + plat._id }">
                  <h3
                    class="m-2 p-2 text-center text-white bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                  >
                    Modifier plat
                  </h3>
                </router-link>
              </div>
            </div>
            <div class="flex items-center justify-center mt-16">
              <button
                class="bottom-0 absolute w-5/6 m-2 p-2 text-center text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                @click="deletePlat(plat._id)"
                type="button"
              >
                Supprimer plat
              </button>
            </div>
          </div>
        </div>
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
  name: "AdminPlat",
  components: {
    navbar,
  },
  data() {
    return {
      plats: {},
    };
  },

  methods: {
    async getPlats() {
      const response = await fetch(RESTAURATION_API + "plats/");

      this.plats = await response.json();
      console.log(this.plats);
    },

    async deletePlat(idPlat) {
      console.log(idPlat);

      if (confirm("Êtes-vous sur de supprimer le plat ?")) {
        let tokenJWT = cookies.get("tokenJWT");
        console.log(tokenJWT);
        const settings = {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: "Basic " + tokenJWT,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        console.log(settings);
        const response = await fetch(
          RESTAURATION_API + "deletePlat/" + idPlat,
          settings
        );

        let reponse = await response.json();
        console.log(reponse);
        this.getPlats();
      } else {
        console.log("Deletion cancelled");
      }
    },
  },

  async mounted() {
    this.getPlats();
  },
};
</script>
