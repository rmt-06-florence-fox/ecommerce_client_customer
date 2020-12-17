<template>
  <div id="login" class="container-fluid">
    <div class="register">
      <img src="../assets/gambar3.jpg" class="front-img">
    </div>
    <div class="login form">
      <form @submit.prevent="login" id="login-form">
        <div class="form-group">
            <label for="email-input">Email address</label>
            <input type="email" class="form-control" v-model="email" id="email-input" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                else.</small>
        </div>
        <div class="form-group">
            <label for="password-input">Password</label>
            <input type="password" class="form-control" v-model="password" id="password-input">
        </div>
        <button type="submit" class="btn btn-info">Login</button>
          <div align="center" style="margin: 10%">
              <span>
                  <small> Don't have an account? </small>
              </span>
              <a class="btn btn-link"><router-link to="/register">Register here</router-link></a>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
  .front-img {
    width: 600px;
    position: relative;
  }
  #login {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
</style>
