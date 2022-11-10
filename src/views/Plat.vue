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
        <p class="text-gray-700 text-base" v-for="(aliment, index) in plat.aliments">
          {{ aliment.nom }}, 
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
      let panier = cookies.get('panier');
      let panierArray = []
      //console.log(platJSON)
      if(panier != [] && panier != undefined && panier != null)
      {
        //Test
       //console.log(panier)
        // panierArray.push(platTemp);
        // console.log(panierArray)
        //console.log(JSON.parse(plat));
        //panierArray.push(plat);
        //console.log(panierArray);
        //cookies.set("panier", panierArray , "20s");
        
      }
      else
      {
        
        panierArray.push(plat);
        cookies.set("panier", panierArray , "20s");
      }
      
      // let test2 = JSON.parse(test);
      // console.log("After parse : " + test2[0].nom);
    },
  },

  async mounted() {
    this.getPlats();
  },
};
</script>
