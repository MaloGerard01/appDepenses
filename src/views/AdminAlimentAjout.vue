<template>
  <navbar/>
  <form class="m-auto w-full" method="POST" @submit.prevent="ajoutAliment">
    <div class="rounded overflow-hidden shadow-lg">
      <img class="w-80" src="../assets/hamburger-0.jpg" alt="">
      <div class="px-6 py-4">
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 mb-3 w-full group">
              <p> Nom du aliment </p>
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        v-model="aliment.nom"
                        id="infos">              
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <p> Type </p>
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        v-model="aliment.type"
                        id="infos">              
            </div>
            <div class="relative z-0 mb-3 w-full group">
              <p> Quantité en stock </p>
              <input class="h-12 w-56 appearance-none block bg-gray-200 text-gray-700 border border-gray-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-gray-300"
                        v-model="aliment.stock"
                        id="infos">              
            </div>
        </div>
      </div>

      <div class="relative z-0 mb-3 w-full group" v-if="showMessage">
    <p class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> {{message}} </p>
  </div>

      <!-- <div class="border-solid border-2 border-sky-500" >
      {{ aliment.nom }}
      </div> -->
      <button class=" text-black font-bold m-3 py-2 px-2 border border-black rounded w-50" type="submit" :disabled="button">
                    Ajouter aliment
        </button>
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
import navbar from '@/components/navbar.vue'

export default {
  name: "AdminAlimentAjout",
  components: {
    navbar
  },
  data() {
    return {
      route: useRoute(),
      aliment: {
        nom : "",
        type : "",
        stock: 0,
      },
      showMessage: false,
      message: "",
    };
  },

  methods: {

    // async getAliments() {
    //   //const settings = { method: "GET"}
    //   // const settings = { method: "POST", 
    //   //           headers: { Accept: "application/json", "Content-Type": "application/json",},
    //   //       };
    //   const response = await fetch(RESTAURATION_API + "aliments/");

    //   this.aliments = await response.json();
    //   console.log(this.aliments);
    // },

    async ajoutAliment() {
      console.log(this.aliment)
      if(this.aliment.nom != "" && this.aliment.type != "" && this.aliment.stock != 0)
      {      
      let tokenJWT = cookies.get('tokenJWT');
      console.log(tokenJWT);

      let alimentData = JSON.stringify(this.aliment);
      console.log(alimentData);
      const settings = { method: "POST", 
                mode: 'cors',
                headers: {'Authorization': 'Basic ' + tokenJWT,'Accept': 'application/json','Content-Type': 'application/json'},
                body: alimentData,
            };
            console.log(settings)
      const response = await fetch(RESTAURATION_API + "insertAliment", settings);

      let reponse = await response.json();
      console.log(reponse);
      this.showMessage = false;
    }
    else
    {
        this.showMessage = true;
        this.message = "Valeurs incorrectes";
    }
    },

    // deleteAliment(idAliment) {

    //    console.log(this.aliment.aliments[idAliment])
    //    this.aliment.aliments.splice(idAliment,1);
      
    // },

    // addAliment() {
    //   console.log(this.nvAliment);
    //   if(this.nvAliment.nom != "" && this.nvAliment.quantite != 0 && this.nvAliment.quantite != null)
    //   {
    //     let newAliment = {nom :"", quantite :"",_id: ""};
    //     this.showMessage = false;
    //     newAliment._id = this.nvAliment._id;
    //     newAliment.nom = this.nvAliment.nom;
    //     newAliment.quantite = this.nvAliment.quantite;
    //     console.log(newAliment);
    //     this.aliment.aliments.push(newAliment); 
    //     //this.nvAliment.nom = "";
    //     //this.nvAliment.quantite = 0;
    //     console.log(this.aliment.aliments)
    //   }
    //   else
    //   {
    //     console.log("incorrect")
    //     this.showMessage = true;
    //     this.message = "Valeurs incorrectes";
    //   }
    // },
  },

  // async mounted() {
  //   this.getAliments();
  // },
};
</script>
