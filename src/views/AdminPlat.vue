<template>
  <div class="plat">
    <h1 class="italic text-4xl m-10 text-center">Panel Admin Plats</h1>
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
        <router-link :to="{ path: '/adminplatModif/' + plat._id }">
                <h3 class="m-2 p-2 text-center text-black text-base border-2 border-yellow-500">
                    Modifier plat
                </h3>
        </router-link>
        <div class='flex items-center justify-center'>
        <button class="w-96 m-2 p-2 text-center text-black text-base border-2 border-red-500" @click="deletePlat(plat._id)" type="button">
                    Supprimer plat
        </button>
      </div>
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
var RESTAURATION_API = "http://localhost:3000/";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  name: "AdminPlat",
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
      const response = await fetch(RESTAURATION_API + "plats/");

      this.plats = await response.json();
      console.log(this.plats);
    },

    async deletePlat(idPlat) {
      console.log(idPlat)

      if(confirm("Do you really want to delete?"))
      {
        let tokenJWT = cookies.get('tokenJWT');
        console.log(tokenJWT);
        const settings = { method: "POST", 
                mode: 'cors',
                headers: {'Authorization': 'Basic ' + tokenJWT,'Accept': 'application/json','Content-Type': 'application/json'}
            };
        console.log(settings)
        const response = await fetch(RESTAURATION_API + "deletePlat/" + idPlat, settings);

        let reponse = await response.json();
        console.log(reponse);
        this.getPlats();
      }
      else
      {
        console.log("Deletion cancelled")
      }


    },
  },

  async mounted() {
    this.getPlats();
  },
};
</script>

<style scoped>
.border {
    border-width: 5px;
    color: black;
  }
</style>