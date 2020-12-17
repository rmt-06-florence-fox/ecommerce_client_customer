<template>
  <div class="login-all-page">
    <br>
    <h1 class="title">Pasar Digital</h1>
    <div class="card col-md-9 login-form mt-3 shadow p-3 rounded">
      <img src="https://image.freepik.com/free-vector/cute-shopping-cart-logo_23-2148453859.jpg" class="card-img-top" alt="Cart Logo" height="200px" width="1500px">
      <div class="card-body p-0">
        <div class="input-group mb-3 mb-0">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Email</span>
          </div>
          <input type="email" class="form-control" aria-describedby="basic-addon3" v-model="email" placeholder="Enter your email" required>
        </div>
        <div class="input-group mb-3 mb-0">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Password</span>
          </div>
          <input type="password" class="form-control" aria-describedby="basic-addon3" v-model="password" placeholder="Enter your password" required>
        </div>
      </div>
      <div class="button">
        <button type="button" class="btn btn-primary col-3 p-1 mb-2 mr-1 btn-register" @click.prevent="register">Register</button>
        <button type="button" class="btn btn-danger col-3 p-1 mb-2 ml-1 btn-register" @click.prevent="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    cancel () {
      this.$router.push('/login')
    },
    register () {
      this.$store.dispatch('register', { email: this.email, password: this.password })
        .then(response => {
          this.$router.push('/login')
        })
        .catch(error => {
          this.$alert(error.response.data.message)
        })
        .finally(() => {
          this.email = ''
          this.password = ''
        })
    }
  }
}
</script>

<style>

</style>
