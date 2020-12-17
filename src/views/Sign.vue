<template>
  <div class="main">
    <Login v-if="sign === 'login'"></Login>
    <Register v-else-if="sign === 'register'"></Register>
  </div>
</template>

<script>
import Login from '../components/Login'
import Register from '../components/Register'
export default {
  name: 'Sign',
  components: {
    Login,
    Register
  },
  computed: {
    sign () {
      return this.$store.state.sign
    }
  },
  methods: {
    loggedIn () {
      if (localStorage.getItem('access_token')) {
        this.$router.push('/')
      }
    }
  },
  created () {
    this.loggedIn()
  }
}
</script>

<style>
</style>
