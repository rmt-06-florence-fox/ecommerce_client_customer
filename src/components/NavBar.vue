<template>
  <div class="top-nav-bar">
        <img src="../assets/navbar-logo.jpg" class="logo">
        <a class="navbar-brand" @click.prevent="$router.push({ name: 'Home' })">EG Store</a>
        <div class="search-box" style="display: none;">
            <input type="text" class="form-control">
            <span class="input-group-text"><i class="fa fa-search" aria-hidden="true"></i></span>
        </div>
        <div class="menu-bar">
            <ul v-if="!isLogin">
                <li><a style="color: white;" @click.prevent="$router.push({ name: 'Login' })" >log in</a></li>
                <li><a style="color: white;" @click.prevent="$router.push({ name: 'Register' })" >register</a></li>
            </ul>
            <ul v-else>
                <li><a style="color: white;" @click.prevent="$router.push({ name: 'Cart' })"><i class="fa fa-shopping-basket"></i>cart</a></li>
                <li><a style="color: white;" @click.prevent="signOut">sign out</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    signOut () {
      this.$store.commit('SET_LOGIN', false)
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
