<template>
    <div class="container">
        <Navbar />
        <router-view/>
        Gibson 2020
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
