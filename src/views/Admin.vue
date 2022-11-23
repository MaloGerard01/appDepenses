<template>
  <navbar />
  <div class="grid h-screen place-items-center">
    <form class="grid content-center w-1/2" @submit.prevent="submitForm">
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Email</label
        >
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="adresse@email.com"
          v-model="form.email"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Mot de passe</label
        >
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="form.mdp"
          required
        />
      </div>

      <div class="mb-6" v-if="showMessage">
        <p
          class="bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {{ message }}
        </p>
      </div>
      <button
        type="submit"
        class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Connexion
      </button>
    </form>
  </div>
</template>

<script>
var RESTAURATION_API = "http://localhost:3000/login";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import navbar from "@/components/navbar.vue";

export default {
  name: "Admin",
  components: {
    navbar,
  },
  data() {
    return {
      plats: {},
      form: {
        email: "",
        mdp: "",
      },
      loginResponse: null,
      showMessage: false,
      message: "",
    };
  },

  methods: {
    async submitForm() {
      let formData = JSON.stringify(this.form);
      const settings = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: formData,
      };
      console.log(settings);
      const response = await fetch(RESTAURATION_API, settings);

      this.loginResponse = await response.json();
      if (this.loginResponse.error == "User not found!") {
        this.message = "E-mail incorrect.";
        this.showMessage = true;
      } else if (this.loginResponse.error == "Incorrect password!") {
        this.message = "Mot de passe incorrect.";
        this.showMessage = true;
      } else {
        cookies.set("tokenJWT", this.loginResponse.token, "24h");
        this.showMessage = false;
        this.$router.push("/adminplat");
      }
    },
  },
};
</script>
