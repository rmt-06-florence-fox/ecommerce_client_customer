<template>
  <div style="margin-top:5em">
    <form
      class="form-signin bg-light bordered rounded shadow-lg text-left"
      @submit.prevent="register"
    >
    <h3><strong>Register</strong></h3>
    <br>
    <div class="form-group">
      <label for="username">Username</label>
      <input
        v-model="new_user.username"
        type="text"
        id="username"
        required
        class="form-control"
        placeholder="Insert Username Here"
      >
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        required
        class="form-control"
        placeholder="Insert Email here"
        v-model="new_user.email"
      >
    </div>
    <div class="form-group">
      <label for="Password">Password</label>
      <input
        type="password"
        id="password"
        required
        class="form-control"
        placeholder="Insert Password Here"
        v-model="new_user.password"
      >
    </div>
    <button class="btn btn-sm btn-block btn-primary" type="submit">Register</button>
    <hr>
    <p>Already have an account ? <router-link to="/login">Login</router-link></p>
    </form>
  </div>
</template>

<script>
import { Swal, Toast } from '../config/swal'

export default {
  name: 'Register',
  data () {
    return {
      new_user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', this.new_user)
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
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong...',
            text: err.response.data.msg
          })
        })
    }
  }
}
</script>

<style>

</style>
