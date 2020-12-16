<template>
  <div class="container">
    <Navbar/>
    <div class="row mt-5">
      <div class="card shadow col-4 mt-5 mx-auto border border-rounded">
        <div class="card-header">
          <img class="img" src="../assets/login-logo.png" alt="">
        </div>
        <div class="card-body">
          <h1><b>Login</b></h1>
          <form @submit.prevent="login">
            <div class="form-group mt-3">
              <label for="loginEmail">Email Address</label>
              <input type="email" class="form-control mt-1" v-model="email" placeholder="input your email" required>
            </div>
            <div class="form-group mt-2">
              <label for="loginPassword">Password</label>
              <input type="password" class="form-control mt-1" v-model="password" placeholder="input your password" required>
            </div>
            <div class="row mt-4 mb-4">
              <div class="col-12">
                <button type="submit" class="btn col-3 btn-primary">Login</button>
                <button type="submit" class="btn col-8 btn-primary ml-4" @click="toRegister">Don't Have An Account?</button>
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
  name: 'Login',
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
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(res => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
  .img {
    width: 100%;
    height: 100%;
  }
</style>
