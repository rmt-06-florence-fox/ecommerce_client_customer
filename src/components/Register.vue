<template>
  <div class="container mt-2" id="registerPage">
    <div class="row">
      <div class=".col-12 .col-md-8" style="min-width: 640px;">
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-7">
              <div class="card-body">
                <h5 class="card-title">Register</h5>
                <form class="form-container" id="registerForm" @submit.prevent="register">
                    <div class="form-group">
                      <label for="emailRegisterForm">Email address</label>
                      <input type="email" class="form-control" id="emailRegister" v-model="email" aria-describedby="emailHelp" required>
                      <p class="text-kecil"><small>We'll never share your email with anyone else.</small></p>
                    </div>
                    <div class="form-group">
                      <label for="passwordRegisterForm">Password</label>
                      <input type="password" class="form-control" id="passwordRegister" v-model="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mt-2">Register</button>
                </form>
                <button @click="changeSign('login')" class="btn btn-primary btn-block mt-2" id="alreadyHaveAccount">Already Have Account?</button>
              </div>
            </div>
            <div class="col-md-5">
              <img src="../assets/register.jpg" class="card-img" alt="Image">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    changeSign (payload) {
      this.$store.commit('changeSign', payload)
    },
    register () {
      const payload = {
        email: this.email,
        password: this.password,
        role: 'customer'
      }
      this.$store.dispatch('register', payload)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registered!',
            text: 'You can now login with your new account'
          })
          this.$store.commit('changeSign', 'login')
        })
        .catch((error) => {
          console.log(error)
          let message
          if (error.response.data.error[0]) {
            message = 'Email already used'
          } else {
            message = 'There is something wrong!'
          }
          Swal.fire({
            icon: 'error',
            title: 'Oppss..',
            text: message
          })
        })
    }
  }
}
</script>

<style>

</style>
