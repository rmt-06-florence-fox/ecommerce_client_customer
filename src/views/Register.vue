<template>
  <div class="container">
    <Navbar/>
    <div class="row mt-5">
      <div class="card shadow col-4 mt-5 mx-auto border border-rounded">
        <div class="card-header">
          <img class="img" src="../assets/login-logo.png" alt="">
        </div>
        <div class="card-body">
          <h1><b>Register</b></h1>
          <form @submit.prevent="register">
            <div class="form-group mt-3">
              <label for="registerEmail">Email Address</label>
              <input type="email" class="form-control mt-1" v-model="email" placeholder="input your email" required>
            </div>
            <div class="form-group mt-2">
              <label for="loginPassword">Password</label>
              <input type="password" class="form-control mt-1" v-model="password" placeholder="input your password" required>
            </div>
            <div class="row mt-4 mb-4">
              <div class="col">
                <button type="submit" class="btn col-4 btn-primary mr-3">Register</button>
                <button type="submit" @click="toLogin" class="btn col-7 btn-primary ml-2">Have An Account?</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .img {
    width: 100%;
    height: 100%;
  }
</style>
