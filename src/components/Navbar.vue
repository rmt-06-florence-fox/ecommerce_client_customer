<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height: 100px;">
    <router-link to="/" class="navbar-brand">H8 ECOMMERCE</router-link>
    <div class="ml-auto" v-if="!$store.state.isLoggedIn">
      <button class="btn btn-lg btn-primary" @click="$router.push('/users/login')">Login</button>
    </div>
    <div class="ml-auto" v-else>
      <button class="btn btn-lg btn-primary mr-3" @click="$router.push('/checkout')">Cart</button>
      <button class="btn btn-lg btn-primary" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('setLoggedIn', false)
      Swal.fire({
        title: 'Logged Out',
        text: 'Logout Successfull!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
        .then(_ => {
          if (this.$router.currentRoute.path === '/') {
            console.log('Logout Successful!')
          } else {
            this.$router.push('/')
          }
        })
    }
  }
}
</script>

<style>

</style>
