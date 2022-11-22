<template>
  <navbar/>
  <div class="aliment">
    <h1 class="italic text-4xl m-10 text-center">Panel Admin Aliments</h1>
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    <div  v-for="(aliment, index) in aliments">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-50" src="../assets/hamburger-0.jpg" alt="Mountain">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ aliment.nom }}</div>
        <div class="font-bold text-l mb-2">{{ aliment.type }}</div>
        <div class="relative z-0 mb-3 w-full group">
              <input class="h-12 w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        type="number"
                        v-model="aliment.stock"
                        id="infos">
              
            </div>
        <div class='flex items-center justify-center'>
        <button class="w-full m-2 p-2 text-center text-black text-base border-2 border-yellow-500" @click="modifStockAliment(index, aliment._id)" type="button">
                    Modifier la quantité
        </button>
      </div>

      <div class='flex items-center justify-center'>
        <button class="w-full m-2 p-2 text-center text-black text-base border-2 border-red-500" @click="supprimerAliment(aliment._id)" type="button">
                    Supprimer
        </button>
      </div>
      </div>
    </div>

      <!-- <div class="border-solid border-2 border-sky-500" >
      {{ aliment.nom }}
      </div> -->
    </div>
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
  name: "AdminAliment",
  components: {
    navbar
  },
  data() {
    return {
      aliments: {},
    };
  },

methods: {
    async getAliments() {
      //const settings = { method: "GET"}
      // const settings = { method: "POST", 
      //           headers: { Accept: "application/json", "Content-Type": "application/json",},
      //       };
      const response = await fetch(RESTAURATION_API + "aliments/");

      this.aliments = await response.json();
      console.log(this.aliments);
    },

    async modifStockAliment(index, idaliment) {
      console.log(idaliment)
      if(confirm("Do you really want to update ?"))
      {
        let alimentData = JSON.stringify(this.aliments[index]);
        let tokenJWT = cookies.get('tokenJWT');
        console.log(tokenJWT);
        const settings = { method: "POST", 
                mode: 'cors',
                headers: {'Authorization': 'Basic ' + tokenJWT,'Accept': 'application/json','Content-Type': 'application/json'},
                body: alimentData,
            };
        console.log(settings)
        const response = await fetch(RESTAURATION_API + "updateAliment/" + idaliment, settings);

        let reponse = await response.json();
        console.log(reponse);
        this.getAliments();
      }
      else
      {
        console.log("Update cancelled")
      }


    },

    async supprimerAliment(idaliment) {
      console.log(idaliment)
      if(confirm("Do you really want to delete ?"))
      {
        let tokenJWT = cookies.get('tokenJWT');
        const settings = { method: "POST", 
                mode: 'cors',
                headers: {'Authorization': 'Basic ' + tokenJWT,'Accept': 'application/json','Content-Type': 'application/json'},
            };
        console.log(settings)
        const response = await fetch(RESTAURATION_API + "deleteAliment/" + idaliment, settings);

        let reponse = await response.json();
        console.log(reponse);
        this.getAliments();
      }
      else
      {
        console.log("Delete cancelled")
      }


    },
  },

  async mounted() {
    this.getAliments();
  },
};
</script>
