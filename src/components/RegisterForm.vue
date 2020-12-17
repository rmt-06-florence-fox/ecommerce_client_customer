<template>
  <div class="col-md-4">
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password" class="form-control">
      </div>
      <div class="form-group">
        <label for="rpassword">Retype Password</label>
        <input type="password" name="rpassword" id="rpassword" v-model="rpassword" class="form-control">
      </div>
      <hr>
      <div class="form-group">
        <button class="btn btn-block btn-info">Register</button>
      </div>
      <div class="form-group">
        <button class="btn btn-block btn-danger" @click="$router.push('login')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'RegisterForm',
  data () {
    return {
      email: '',
      password: '',
      rpassword: ''
    }
  },
  methods: {
    register () {
      if (this.password === this.rpassword) {
        const payload = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('register', payload)
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Password does not match!',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  }
}
</script>
