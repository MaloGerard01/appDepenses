<template>
  <navbar />
  <div class="plat">
    <h1 class="italic text-4xl m-10 text-center">Equilibres</h1>
    <div class="p-10 w-full">
      <ul v-bind:key="index" v-for="(equilibretotal, index) in equilibres">
        <div v-bind:key="index" v-for="(e, index) in equilibretotal.equilibre">
          <li class="pb-3 my-2 p-4 sm:pb-4 rounded-md bg-gray-200">
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-base font-medium text-blue-500 truncate dark:text-white">
                  {{ getUserById(equilibretotal._idUser).nom }}
                </p>
                <p class="text-base text-gray-500 truncate dark:text-gray-400">
                  doit à
                </p>
                <p class="text-base font-medium text-blue-500 truncate dark:text-gray-400">
                  {{ getUserById(e._idUserConcerne).nom }}
                </p>
              </div>
              <div class="inline-flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                {{ e.montant.toFixed(1) }} €
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
var GESTIONDEPENSE_API = "http://localhost:3000";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from "@/components/navbar.vue";

export default {
  name: "Equilibres",
  components: {
    navbar,
  },
  data() {
    return {
      users: {},
      equilibres: [],
    };
  },

  methods: {

    async getUsers() {
      const response = await fetch(GESTIONDEPENSE_API + "/getUsers");

      this.users = await response.json();
      console.log(this.users);
    },

    getUserById(id) {
      let user = this.users.find(item => item._id === id)
      if(user != undefined){
        return user;
      }
      else
      {
        let user = {nom: "User"};
        return user;
      }
      
    },

    async calculEquilibre() {
      console.log(this.users);
      this.users.forEach(async (user) => {
        let userEquilibre = { _idUser: "", equilibre: [] };
        userEquilibre._idUser = user._id;
        const response = await fetch(GESTIONDEPENSE_API + "/getDepensesWhereUserIsConcerned/" + user._id);
        let depensesConcerned = await response.json();
        depensesConcerned.forEach(depense => {
          let depenseEquilibre = { _idUserConcerne: "", montant: 0 }
          depenseEquilibre._idUserConcerne = depense.idUser;
          depenseEquilibre.montant = (depense.total / (depense.paiementConcerne.length + 1));

          userEquilibre.equilibre.push(depenseEquilibre);
        });

        var result = [];

        userEquilibre.equilibre.forEach(function (a) {
          if (!this[a._idUserConcerne]) {
            this[a._idUserConcerne] = { _idUserConcerne: a._idUserConcerne, montant: 0 };
            result.push(this[a._idUserConcerne]);
          }
          this[a._idUserConcerne].montant += a.montant;
        }, Object.create(null));


        userEquilibre.equilibre = result;

        this.equilibres.push(userEquilibre);

      });

    },
  },

  async mounted() {
    await this.getUsers();
    this.calculEquilibre();
  },
};
</script>
