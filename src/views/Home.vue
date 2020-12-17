<template>
  <div class="container-fluid">
      <div>
        <Navbar />
      </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  methods: {
    checkLogin () {
      this.$store.commit('checkLogin', true)
    }
  },
  created () {
    if (localStorage.access_token) {
      this.checkLogin()
    }
  }
}
</script>
<style scoped>
</style>
