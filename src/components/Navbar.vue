<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
      <div class=".px-2 justify-content-sm-center">
        <img width="35" height="35" src="../assets/home.svg" alt=""  @click.prevent="gohome"><strong @click.prevent="gohome" class="text-white">Home </strong>

        <img width="35" height="35" src="../assets/carts.svg" alt="" @click.prevent="userCart"><strong @click.prevent="userCart" class="text-white">Cart</strong>
      </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
      <div class="navbar-nav">
        <img width="100" height="48" src="../assets/39-398504_nike-logo-png-nike-logo-png-white.png" alt="">
      </div>
    <!-- </div> -->
      <div class="d-flex justify-content-end">
        <button v-if="!$store.state.isLogin" class="btn btn-outline-primary" @click="login"><strong>Login</strong></button>
        <button v-if="$store.state.isLogin" class="btn btn-outline-danger ml-auto" type="submit" @click="logout">Logout</button>
      </div>
  </div>
</nav>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    login () {
      this.$router.push('/login')
      this.$store.dispatch('login')
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$store.commit('setLogin', false)
      this.$store.dispatch('fetchCart')
      this.$router.push('/login').catch(() => {})
    },
    userCart () {
      this.$router.push('/cart').catch(() => {})
    },
    gohome () {
      this.$router.push('/').catch(() => {})
    }
  }
}
</script>

<style>

</style>
