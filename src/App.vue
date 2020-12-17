<template>
  <div id="app">
      <Navbar/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
<style scoped>
 #app {
   font-family: Georgia, 'Times New Roman', Times, serif;
 }
</style>
