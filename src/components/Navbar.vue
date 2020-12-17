<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-info">
    <a class="navbar-brand">Toko Kita</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link"
                v-on:click.prevent="home"
                v-if="this.$route.name === 'Home' || this.$route.name === 'Cart' || this.$route.name === 'Wishlist'">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                v-on:click.prevent="login"
                v-if="this.$route.name === 'Login' || this.$route.name === 'Register'">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                v-on:click.prevent="register"
                v-if="this.$route.name === 'Login' || this.$route.name === 'Register'">Register</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                v-on:click.prevent="cart"
                v-if="this.$route.name === 'Home' || this.$route.name === 'Cart' || this.$route.name === 'Wishlist'">Cart</a>
            </li>
            <li class="nav-item">
                <a class="nav-link"
                v-on:click.prevent="wishlist"
                v-if="this.$route.name === 'Home' || this.$route.name === 'Cart' || this.$route.name === 'Wishlist'">Wishlist</a>
            </li>
        </ul>
    </div>
    <div>
        <button type="button" class="btn btn-warning" v-on:click.prevent="logout" v-if="this.$route.name === 'Home'">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods:{
    home () {
      this.$router.push({ name: 'Home' })
    },
    login () {
      this.$router.push({ name: 'Login' })
    },
    register () {
      this.$router.push({ name: 'Register' })
    },
    cart () {
      this.$router.push({ name: 'Cart' })
    },
    wishlist () {
      this.$router.push({ name: 'Wishlist' })
    },
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
    }
  }

}
</script>

<style>

</style>