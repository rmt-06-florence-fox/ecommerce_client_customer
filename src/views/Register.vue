<template>
  <main class="container">
     <div class="loading" v-if="isLoading">
        <center>
          <lottie-player src="https://assets4.lottiefiles.com/animated_stickers/lf_tgs_g7ve4rc8.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop  autoplay></lottie-player>
        </center>
      </div>
    <div class="container-fluid container-md" v-else>
      <div class="row">
        <div class="col-sm-6 register-section-wrapper">
          <div class="brand-wrapper">
            <img src="assets/logo.jpg" alt="logo" class="logo">
          </div>
          <div class="register-wrapper my-auto">
            <h1 class="register-title">Register in</h1>
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="email@example.com" v-model="email">
              </div>
              <div class="form-group mb-4">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="enter your passsword" v-model="password">
              </div>
              <input name="submit" id="register" class="btn btn-block register-btn" type="submit" value="Register">
            </form>
            <p class="register-wrapper-footer-text">Done have an account? <router-link to="/login" class="text-reset">Login here</router-link></p>
          </div>
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img src="assets/register.jpg" alt="" class="register-img">
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
    register () {
      if (localStorage.getItem('access_token')) {
        swal('Error', 'Anda telah Login')
      } else {
        this.isLoading = true
        const obj = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('register', obj)
          .then(value => {
            swal({
              text: 'Register Success',
              title: 'Yeay',
              icon: 'success'
            })
            this.$router.push('/login')
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
body {
  font-family: "Karla", sans-serif;
  background-color: #fff;
  min-height: 100vh; }

.brand-wrapper {
  padding-top: 7px;
  padding-bottom: 8px; }
  .brand-wrapper .logo {
    height: 25px; }

.register-section-wrapper {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  padding: 68px 100px;
  background-color: #fff; }
  @media (max-width: 991px) {
    .register-section-wrapper {
      padding-left: 50px;
      padding-right: 50px; } }
  @media (max-width: 575px) {
    .register-section-wrapper {
      padding-top: 20px;
      padding-bottom: 20px;
      min-height: 100vh; } }

.register-wrapper {
  width: 300px;
  max-width: 100%;
  padding-top: 24px;
  padding-bottom: 24px; }
  @media (max-width: 575px) {
    .register-wrapper {
      width: 100%; } }
  .register-wrapper label {
    font-size: 14px;
    font-weight: bold;
    color: #b0adad; }
  .register-wrapper .form-control {
    border: none;
    border-bottom: 1px solid #e7e7e7;
    border-radius: 0;
    padding: 9px 5px;
    min-height: 40px;
    font-size: 18px;
    font-weight: normal; }
    .register-wrapper .form-control::-webkit-input-placeholder {
      color: #b0adad; }
    .register-wrapper .form-control::-moz-placeholder {
      color: #b0adad; }
    .register-wrapper .form-control:-ms-input-placeholder {
      color: #b0adad; }
    .register-wrapper .form-control::-ms-input-placeholder {
      color: #b0adad; }
    .register-wrapper .form-control::placeholder {
      color: #b0adad; }
  .register-wrapper .register-btn {
    padding: 13px 20px;
    background-color: #fdbb28;
    border-radius: 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 14px; }
    .register-wrapper .register-btn:hover {
      border: 1px solid #fdbb28;
      background-color: #fff;
      color: #fdbb28; }
  .register-wrapper a.forgot-password-link {
    color: #080808;
    font-size: 14px;
    text-decoration: underline;
    display: inline-block;
    margin-bottom: 54px; }
    @media (max-width: 575px) {
      .register-wrapper a.forgot-password-link {
        margin-bottom: 16px; } }
  .register-wrapper-footer-text {
    font-size: 16px;
    color: #000;
    margin-bottom: 0; }

.register-title {
  font-size: 30px;
  color: #000;
  font-weight: bold;
  margin-bottom: 25px; }

.register-img {
  width: 100%;
  height: 100vh;
  -o-object-fit: cover;
     object-fit: cover;
  -o-object-position: left;
  object-position: left;}
  .container{
    margin-bottom: 100px;
    border: 0;
    border-radius: 27.5px;
    box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
    overflow: hidden;
    margin-top: 150px;
  }

/*# sourceMappingURL=register.css.map */
</style>
