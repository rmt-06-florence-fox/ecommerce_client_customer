<template>
  <nav class="navbar sticky-top navbar-light shadow bg-light mb-4">
    <a class="navbar-brand font-weight-bold" style="cursor: pointer" @click.prevent="toMainPage">Han Store</a>
    <div>
      <button v-if="$route.path=='/signup'" class="btn btn-sm btn-outline-success rounded-pill font-weight-bold text-dark" type="button" @click.prevent="toSignIn">Sign In</button>
      <button v-if="$route.path=='/'" class="btn btn-sm btn-outline-info rounded-pill font-weight-bold text-dark" type="button" @click.prevent="toSignUp">Sign Up</button>
      <button v-if="$route.path!='/' && $route.path!='/signup'" class="btn btn-sm btn-outline-danger rounded-pill font-weight-bold text-dark" type="button" @click.prevent="doSignOut">Sign Out</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return { access: '' }
  },
  methods: {
    toSignIn () {
      this.$router.push('/')
    },
    toMainPage () {
      this.$router.push('home')
    },
    doSignOut () {
      localStorage.clear()
      this.$router.push('/')
    },
    isAuthenticated () {
      this.access = localStorage.getItem('access_token')
    },
    toSignUp () {
      this.$router.push('signup')
    }
  },
  created () {
    this.isAuthenticated()
  }
}
</script>

<style>

</style>
