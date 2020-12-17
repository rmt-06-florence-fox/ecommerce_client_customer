<template>
  <div>
    <Navbar></Navbar>
    <div class="container my-5 py-3 border border-dark rounded bg-secondary text-white" style="width: 35%;">
        <div class="container" id="login">
            <div class="container">
                <h3 class="text-center my-3">Register</h3>
            </div>
            <form id="RegisterForm" class="my-3">
                <div class="form-group">
                    <label for="input_email">Email address</label>
                    <input type="email" class="form-control" id="input_email" placeholder="Email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="input_password">Password</label>
                    <input type="password" class="form-control" id="input_password" placeholder="Password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;" v-on:click.prevent="register">Register</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Register',
  components: {
    Navbar
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      let newUser = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', newUser)
    }
  }
}
</script>

<style>

</style>
