<template>
  <div class="plat">
    <h1 class="italic text-4xl m-10 text-center">Plats</h1>
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    <div  v-for="(plat, index) in plats">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-50" src="../assets/hamburger-0.jpg" alt="Mountain">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ plat.nom }}</div>
        <div class="font-bold text-l mb-2">{{ plat.type }}</div>
        <div class="font-bold text-l mb-2">{{ plat.prix }} €</div>
        <p class="text-gray-700 text-base" v-for="(aliment, index) in plat.aliments">
          {{ aliment.nom }}
        </p>
      </div>
      <div class='flex items-center justify-center'>
        <button class="w-96 m-2 p-2 text-center text-black text-base border-2 border-green-500" @click="addToPanier(plat)" type="button">
                    Ajouter au panier
        </button>
      </div>
    </div>



      <!-- <div class="border-solid border-2 border-sky-500" >
      {{ plat.nom }}
      </div> -->
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
var RESTAURATION_API = "http://localhost:3000/plats";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  name: "Home",
  components: {
    //HelloWorld
  },
  data() {
    return {
      plats: {},
    };
  },

  methods: {
    async getPlats() {
      //const settings = { method: "GET"}
      // const settings = { method: "POST", 
      //           headers: { Accept: "application/json", "Content-Type": "application/json",},
      //       };
      const response = await fetch(RESTAURATION_API);

      this.plats = await response.json();
    },

    async addToPanier(plat) {
      let panierArray = []
      let panier = cookies.get('panier');
      let panierJSON = ""

      if(panier != [] && panier != undefined && panier != null)
      {        
        let panierParsed = JSON.parse(panier);
        panierParsed.push(plat)
        panierJSON = JSON.stringify(panierParsed);
        cookies.set("panier", panierJSON , "30min");
        console.log(panierJSON)        
      }
      else
      {        
        panierArray.push(plat);
        panierJSON = JSON.stringify(panierArray);
        cookies.set("panier", panierJSON , "30min");
      }
    },
  },

  async mounted() {
    this.getPlats();
  },
};
</script>
