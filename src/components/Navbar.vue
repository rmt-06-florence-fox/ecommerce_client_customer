<template>
  <div class="container">
    <div class="navbar fixed-top bg-primary d-flex" v-if="isLoggedIn === true || loginStatus === true">
      <div class="mr-auto"><router-link class="link" to="/"><h1 class="nav"><b>TokoTokoan</b></h1></router-link></div>
      <div class="mr-4"><router-link class="link" to="/carts"><img src="../assets/cart.png" class="cart" alt=""></router-link></div>
      <div class="mr-4"><router-link class="link" to="/history"><img src="../assets/history.png" class="cart" alt=""></router-link></div>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
    <div class="navbar fixed-top bg-primary d-flex" v-else>
      <div class="mr-auto"><router-link class="link" to="/"><h1 class="nav"><b>TokoTokoan</b></h1></router-link></div>
      <div class="mr-4"><router-link class="link" to="/login"><h3 class="nav">Login</h3></router-link></div>
      <div class="mr-4"><router-link class="link" to="/register"><h3 class="nav">Register</h3></router-link></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      isLoggedIn: ''
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    getStatus () {
      this.$store.dispatch('isLoggedIn')
        .then(res => {
          this.isLoggedIn = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    }
  },
  created () {
    this.getStatus()
  }
}
</script>

<style>
  .link {
    text-decoration: none;
  }
  .nav {
    color: whitesmoke;
  }
  .cart {
    height: 40px;
    width: 70px;
  }
</style>
