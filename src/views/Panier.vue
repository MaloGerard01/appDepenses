<template>
<navbar/>
  <div class="plat">
    <h1 class="italic text-4xl m-10 text-center">Panier</h1>
    <h2 class="italic text-4xl m-10 text-center">Total : {{total}} €</h2>
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      
    <div  v-for="(plat, index) in plats">
    
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-50" src="../assets/hamburger-0.jpg" alt="Mountain">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ plat.nom }}</div>
        <div class="font-bold text-l mb-2">{{ plat.type }}</div>
        <p class="text-gray-700 text-base" v-for="(aliment, index) in plat.aliments">
          {{ aliment.nom }}
        </p>
      </div>
      <div class='flex items-center justify-center'>
        <button class="w-96 m-2 p-2 text-center text-black text-base border-2 border-red-500" @click="removeFromPanier(index)" type="button">
                    Supprimer plat
        </button>
      </div>
    </div>

      <!-- <div class="border-solid border-2 border-sky-500" >
      {{ plat.nom }}
      </div> -->
      
    </div>


    </div>
    <div class='flex items-center justify-center'>
        <button class="w-96 m-2 p-2 text-center text-black text-base border-2 border-green-500" @click="achatPanier()" type="button">
                    Passer commande
        </button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
var RESTAURATION_API = "http://localhost:3000/";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from '@/components/navbar.vue'

export default {
  name: "Panier",
  components: {
    navbar
  },
  data() {
    return {
      total: 0,
      plats: {},
    };
  },

  methods: {
    async getPanier() {
      let panier = cookies.get('panier');
      if(panier != [] && panier != undefined && panier != null)
      {
        let panierParsed = JSON.parse(panier);
        this.plats = panierParsed;
        this.plats.forEach(plat => this.total += plat.prix);
      }
    },

    async removeFromPanier(idPlat) {
      console.log(idPlat);
      this.plats.splice(idPlat, 1);
      let panierJSON = JSON.stringify(this.plats);
      console.log(panierJSON)
      cookies.set("panier", panierJSON , "30min");      
      this.getPanier();
    },

    async achatPanier() {
      
      let panierJSON = JSON.stringify(this.plats);
      console.log(panierJSON);
    },

    async achatPanier() {

      let panierJSON = JSON.stringify(this.plats);
      console.log(panierJSON)
      const settings = { method: "POST", 
                mode: 'cors',
                headers: {'Accept': 'application/json','Content-Type': 'application/json'},
                body: panierJSON,
            };
            console.log(settings)
      const response = await fetch(RESTAURATION_API + "achatPlats", settings);

      let reponse = await response.json();
      console.log(reponse);
    },
  },

  async mounted() {
    this.getPanier();
  },
};
</script>
