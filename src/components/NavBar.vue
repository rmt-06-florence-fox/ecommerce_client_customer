<template>
  <div class="top-nav-bar">
        <img src="../assets/navbar-logo.jpg" class="logo">
        <a class="navbar-brand" @click.prevent="$router.push({ name: 'Home' })">EG Store</a>
        <div class="search-box">
            <input type="text" class="form-control" v-model="searchedObject" placeholder="search...">
            <span class="input-group-text"><i @click="searched" class="fa fa-search" aria-hidden="true" style="cursor: pointer;"></i></span>
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
  data () {
    return {
      searchedObject: ''
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    search () {
      return this.objects.filter(object => {
        return object.name.include(this.searchedObject)
      })
    }
  },
  methods: {
    signOut () {
      this.$store.commit('SET_LOGIN', false)
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'Login' })
    },
    searched () {
      this.$store.commit('SEARCH', this.searchedObject)
    }
  }
}
</script>

<style>

</style>
