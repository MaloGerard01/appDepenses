
<template>
<navbar/>
<div class="plat">
  <h1 class="italic text-4xl m-10 text-center">Plats</h1>
  <select v-model="selectedCategory">
    <option value="All"> Tous </option>
    <option value="Entrée"> Entrées </option>
    <option value="Principal"> Principal </option>
    <option value="Dessert"> Desserts </option>
    <option value="Boisson"> Boissons </option>
  </select>
	<!-- <div class="filter">
		<label><input type="radio" v-model="selectedCategory" value="All" /> Tous</label>
		<label><input type="radio" v-model="selectedCategory" value="Entrées" /> Entrée</label>
		<label><input type="radio" v-model="selectedCategory" value="Principal" /> Principal</label>
		<label><input type="radio" v-model="selectedCategory" value="Dessert" /> Dessert</label>
	</div> -->
  <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    <div  v-for="(plat, index) in filteredPlats">
      <div class="rounded overflow-hidden shadow-lg" :class="[plat.disponible ? activeClass : '', errorClass]" >
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
          <button class="w-96 m-2 p-2 text-center text-black text-base border-2 border-green-500" @click="addToPanier(plat)" type="button" :disabled="!plat.disponible">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
var RESTAURATION_API = "http://localhost:3000";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from '@/components/navbar.vue'

export default {
  name: "Home",
  components: {
    navbar
  },
  data() {
    return {
      activeClass: 'border-2 border-green-500',
      errorClass: 'border-2 border-red-500',
      plats: {},
      selectedCategory: "All",
    };
  },

  methods: {
    async getPlats() {
      //const settings = { method: "GET"}
      // const settings = { method: "POST", 
      //           headers: { Accept: "application/json", "Content-Type": "application/json",},
      //       };
      const response = await fetch(RESTAURATION_API + "/plats");

      this.plats = await response.json();
      this.plats.forEach(async plat => {
        
        plat.aliments.forEach(async aliment => {
          
          
          console.log(aliment._id);
          const response = await fetch(RESTAURATION_API + "/getAliment/" + aliment._id );
          let alimentData = await response.json();
          console.log(alimentData);
          if(alimentData != null || alimentData != undefined)
          {
            if(alimentData.stock <= 0)
            {
              plat.disponible = false;
            }
            else
            {
              plat.disponible = true;
            }
          }
          else
          {
            plat.disponible = false;
          }

      })      
      })


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

  computed: {
		filteredPlats: function() {
			var vm = this;
			var category = vm.selectedCategory;
			
			if(category === "All") {
				return vm.plats;
			} else {
				return vm.plats.filter(function(plat) {
          let isAvailable = false;
          //plat.alimentsforEach(async aliment => {
          //  if(aliment.quantite)
          //})
					return plat.type === category;
				});
			}
		}
	},

  async mounted() {
    this.getPlats();
  },
};
</script>
