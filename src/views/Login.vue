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
      <button type="button" class="btn btn-primary col-3 p-1 mb-2 btn-login" @click.prevent="signin">Login</button>
      <p class="direct-register">Haven't account? <a href="" @click.prevent="register">Register</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signin () {
      this.$store.dispatch('signin', { email: this.email, password: this.password })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/home')
        })
        .catch(error => {
          this.$alert(error.response.data.message)
        })
        .finally(() => {
          this.email = ''
          this.password = ''
        })
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>

</style>
