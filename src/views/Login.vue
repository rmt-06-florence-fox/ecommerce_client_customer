<template>
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="loading container" v-if="isLoading">
        <center>
          <lottie-player src="https://assets4.lottiefiles.com/animated_stickers/lf_tgs_g7ve4rc8.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop  autoplay></lottie-player>
        </center>
      </div>
    <div class="container container-md" v-else>
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="assets/login.jpg" alt="login" class="login-card-img" id="img-login">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <div class="brand-wrapper">
                <img src="assets/logo.jpg" alt="logo" class="logo">
              </div>
              <p class="login-card-description">Sign into your account</p>
              <form id="form-login" @submit.prevent="login">
                  <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input type="email" name="email" id="email" class="form-control" placeholder="Email address" v-model="email">
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" name="password" id="password" class="form-control" placeholder="***********" v-model="password">
                  </div>
                  <input name="login" id="login" class="btn btn-block login-btn mb-4" type="submit" value="Login">
                </form>
                <p class="login-card-footer-text">Don't have an account? <router-link to="/register" class="text-reset">Register here</router-link></p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
</template>

<script>
import swal from 'sweetalert'
export default {
  data () {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    login () {
      if (localStorage.getItem('access_token')) {
        swal('Error', 'Anda sedang Login')
      } else {
        this.isLoading = true
        const obj = {
          email: this.email,
          password: this.password,
          role: 'customer'
        }
        this.$store.dispatch('login', obj)
          .then(value => {
            swal({
              text: 'Login success',
              title: 'Welcome',
              icon: 'success'
            })
            localStorage.setItem('access_token', value.data)
            this.$store.commit('set_isLogin', true)
            this.$router.push('/')
          })
          .catch(err => {
            swal('Error', err.response.data)
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    }
  }
}
</script>

<style scoped>
.brand-wrapper {
  margin-bottom: 19px; }
  .brand-wrapper .logo {
    height: 37px; }

.login-card {
  border: 0;
  border-radius: 27.5px;
  box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
  overflow: hidden; }
  .login-card-img {
    border-radius: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
       object-fit: cover; }
  .login-card .card-body {
    padding: 85px 60px 60px; }
    @media (max-width: 422px) {
      .login-card .card-body {
        padding: 35px 24px; } }
  .login-card-description {
    font-size: 25px;
    color: #000;
    font-weight: normal;
    margin-bottom: 23px; }
  .login-card form {
    max-width: 326px; }
  .login-card .form-control {
    border: 1px solid #d5dae2;
    padding: 15px 25px;
    margin-bottom: 20px;
    min-height: 45px;
    font-size: 13px;
    line-height: 15;
    font-weight: normal; }
    .login-card .form-control::-webkit-input-placeholder {
      color: #919aa3; }
    .login-card .form-control::-moz-placeholder {
      color: #919aa3; }
    .login-card .form-control:-ms-input-placeholder {
      color: #919aa3; }
    .login-card .form-control::-ms-input-placeholder {
      color: #919aa3; }
    .login-card .form-control::placeholder {
      color: #919aa3; }
  .login-card .login-btn {
    padding: 13px 20px 12px;
    background-color: #000;
    border-radius: 4px;
    font-size: 17px;
    font-weight: bold;
    line-height: 20px;
    color: #fff;
    margin-bottom: 24px; }
    .login-card .login-btn:hover {
      border: 1px solid #000;
      background-color: transparent;
      color: #000; }
  .login-card-footer-text {
    font-size: 16px;
    color: #0d2366;
    margin-bottom: 60px; }
    @media (max-width: 767px) {
      .login-card-footer-text {
        margin-bottom: 24px; } }
  #img-login{
      display: flex;
      align-self: flex-start;
  }
  #form-login{
      display: inline;
      align-items: center;
  }
</style>
