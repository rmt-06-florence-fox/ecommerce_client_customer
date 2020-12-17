<template>
  <div class="row ml-5" style="margin-top:5em">
    <div class="col-6 text-center">
      <h3 class="ml-5">Start Shopping With SHOPI !!</h3>
      <hr>
      <img src="../assets/shop.svg" alt="shop" width="80%" style="margin-left: 8em">
    </div>
    <div class="col-6">
      <form
        class="form-signin bg-light rounded shadow text-left"
        @submit.prevent="login"
        style="margin-left: 4em; margin-top: 3em"
      >
      <h3><strong>Login</strong></h3>
      <br>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="user.email"
          placeholder="Insert your email here"
          required
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="user.password"
          placeholder="Insert your password here"
          required
        >
      </div>
      <button class="btn btn-primary btn-sm btn-block" type="submit">Login</button>
      <hr>
      <p>Don't have an account ? <router-link to="/register">Register</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import { Swal, Toast } from '../config/swal'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.user)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user', data.user.username)
          this.$store.commit('setLoggedIn', true)
          this.$router.push({ name: 'Home' })
          Toast.fire({
            icon: 'success',
            title: `Welcome ${data.user.username}`
          })
        })
        .catch(err => {
          console.log('🚀 ~ file: Login.vue ~ line 73 ~ login ~ err', err)
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong...',
            text: err.response
          })
        })
    }
  }
}
</script>

<style>

</style>
