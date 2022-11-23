<template>
  <navbar/>
  <div class="home">
    <h1>Restauration</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/navbar.vue'

export default {
  name: 'Home',
  components: {
    navbar
  }
}
</script>
