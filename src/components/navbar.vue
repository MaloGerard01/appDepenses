<template>
    <div class="bg-black">
      <nav
        class="
          container
          px-6
          py-8
          mx-auto
          md:flex md:justify-between md:items-center
        "
      >
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="
              text-xl
              font-bold
              text-gray-100
              md:text-2xl
              hover:text-indigo-400
            "
            >Restauration
          </router-link>
          <!-- Mobile menu button -->
          <div @click="toggleNav" class="flex md:hidden">
            <button
              type="button"
              class="
                text-gray-100
                hover:text-gray-400
                focus:outline-none focus:text-gray-400
              "
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="
            flex-col
            mt-8
            space-y-4
            md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
          "
        >
          
          <li class="text-gray-100 hover:text-indigo-400"><router-link to="/">Plats</router-link></li>
          <li class="text-gray-100 hover:text-indigo-400"><router-link to="/panier">Panier</router-link></li>
          <li class="text-gray-100 hover:text-indigo-400"><router-link to="/admin">Admin</router-link></li>
          <li v-if="isAdmin" class="text-gray-100 hover:text-indigo-400"><router-link to="/adminplat">Modifier Plats</router-link></li>
          <li v-if="isAdmin" class="text-gray-100 hover:text-indigo-400"><router-link to="/adminplatajout">Ajouter Plat</router-link></li>
          <li v-if="isAdmin" class="text-gray-100 hover:text-indigo-400"><router-link to="/adminaliment">Modifier Aliments</router-link></li>
          <li v-if="isAdmin" class="text-gray-100 hover:text-indigo-400"><router-link to="/adminalimentajout">Ajouter Aliment</router-link></li>
          <li v-if="isAdmin" @click="disconnectAdmin()" class="text-gray-100 hover:text-indigo-400"><router-link to="/">Déconnexion</router-link></li>
        </ul>
      </nav>
    </div>
  </template>


<script>
import { ref } from 'vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export default {
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },

  data() {
    return {
      isAdmin: {},
    };
  },

  methods: {
    checkIsAdmin() {
      let tokenJWT = cookies.get('tokenJWT');
      console.log(tokenJWT);
      if(tokenJWT != undefined && tokenJWT != null && tokenJWT != "undefined")
      {
        this.isAdmin = true;
      }
      else
      {
        this.isAdmin = false;
      }
      console.log(this.isAdmin);
    },

    disconnectAdmin() {
      if(this.isAdmin)
      {
        cookies.set("tokenJWT", undefined);
        this.isAdmin = false;
      }
    },
  },

  mounted() {
    this.checkIsAdmin();
  }
};
</script>