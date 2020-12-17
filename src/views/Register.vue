<template>
  <section class="section">
    <div class="container px-6">
      <h1 class="title">Register</h1>
      <form action="" @submit.prevent="register">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="email" class="input" type="email" placeholder="Email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
          <div class="field">
          <p class="control has-icons-left">
          <input class="input" v-model="password" type="password" placeholder="Password">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-link">
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
// import axios from '../config/axiosInstance'
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      console.log('login')
      this.$store.dispatch('register', { email: this.email, password: this.password })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1000
          })

          const self = this
          setTimeout(function () {
            self.$router.push({ name: 'Login' })
          }, 1000)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message
          })
        })
    }
  }
}
</script>

<style scoped>
.container{
  padding: 20px;
  width: 60%;
  margin: 0 auto;
  box-shadow: 10px 10px 10px 10px gray !important
}
</style>
