<template>
  <form class="m-auto w-full" method="POST" @submit.prevent="ajoutPlat">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-80" src="../assets/hamburger-0.jpg" alt="">
      <div class="px-6 py-4">
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 mb-3 w-full group">
              <p> Nom du plat </p>
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        v-model="plat.nom"
                        id="infos">              
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <p> Type </p>
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        v-model="plat.type"
                        id="infos">              
            </div>
        </div>
        <h2 class="m-3"> Composition </h2> 
        <!-- <p class="m-3" v-if="plat.aliments.length"> ({{ plat.aliments.length }} aliments) </p> -->
        <div class="text-gray-700 text-base" v-for="(aliment, index) in plat.aliments">
          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 mb-3 w-full group">
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        v-model="aliment.nom"
                        id="infos">
              
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        type="number"
                        v-model="aliment.quantite"
                        id="infos">
              
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <button class=" text-red-500 font-bold py-3 px-4 border border-black rounded w-50" @click="deleteAliment(index)" type="button">
                    X
              </button>
            </div>
          </div>
        </div>

        
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 mb-3 w-full group">
              <!-- <input class="h-12 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        v-model="nvAliment.nom"
                        id="infos"> -->

              <select class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                v-model="nvAliment">
                <option v-for="aliment in aliments" :value="aliment">{{aliment.nom}}</option>
              </select>
              
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        type="number"
                        v-model="nvAliment.quantite"
                        id="infos">
              
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <button class=" text-green-500 font-bold py-3 px-4 border border-black rounded w-50" @click="addAliment()" type="button">
                    +
              </button>
            </div>

            <div class="relative z-0 mb-3 w-full group" v-if="showMessage">
    <p class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> {{message}} </p>
  </div>
          </div>



        <h2 class="m-3"> Prix </h2> 
          <input class="h-12 appearance-none block w-50 bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        type="number"
                        v-model="plat.prix"
                        id="infos">
          
        <button class=" text-black font-bold m-3 py-2 px-2 border border-black rounded w-50" type="submit" :disabled="button">
                    Ajouter plat
        </button>
      </div>

      <!-- <div class="border-solid border-2 border-sky-500" >
      {{ plat.nom }}
      </div> -->

    </div>
  </form>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
var RESTAURATION_API = "http://localhost:3000/";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
  name: "AdminPlatAjout",
  components: {
    //HelloWorld
  },
  data() {
    return {
      idPlat : null,
      route: useRoute(),
      plat: {
        nom : "",
        type : "",
        aliments: [],
        prix: 0,
      },
      aliments : {},
      showMessage: false,
      message: "",
      nvAliment: {
                nom: "",
                quantite : null,
            },
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

    async ajoutPlat() {
      console.log(this.plat)

      let tokenJWT = cookies.get('tokenJWT');
      console.log(tokenJWT);

      let platData = JSON.stringify(this.plat);
      console.log(platData);
      const settings = { method: "POST", 
                mode: 'cors',
                headers: {'Authorization': 'Basic ' + tokenJWT,'Accept': 'application/json','Content-Type': 'application/json'},
                body: platData,
            };
            console.log(settings)
      const response = await fetch(RESTAURATION_API + "insertPlat", settings);

      let reponse = await response.json();
      console.log(reponse);
    },

    deleteAliment(idAliment) {

       console.log(this.plat.aliments[idAliment])
       this.plat.aliments.splice(idAliment,1);
      
    },

    addAliment() {
      console.log(this.nvAliment);
      if(this.nvAliment.nom != "" && this.nvAliment.quantite != 0 && this.nvAliment.quantite != null)
      {
        let newAliment = {nom :"", quantite :"",_id: ""};
        this.showMessage = false;
        newAliment._id = this.nvAliment._id;
        newAliment.nom = this.nvAliment.nom;
        newAliment.quantite = this.nvAliment.quantite;
        console.log(newAliment);
        this.plat.aliments.push(newAliment); 
        //this.nvAliment.nom = "";
        //this.nvAliment.quantite = 0;
        console.log(this.plat.aliments)
      }
      else
      {
        console.log("incorrect")
        this.showMessage = true;
        this.message = "Valeurs incorrectes";
      }
    },
  },

  async mounted() {
    this.getAliments();
  },
};
</script>
