<template>
  <div class="register">
    <Navbar />
    <div class="container-fluid">
      <div class="row d-flex mt-5">
        <div class="col-lg-6 d-flex justify-content-end">
          <img class="login-img logo align-self-center" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2020/8/7/95603115/95603115_a03a385c-dddf-4ef4-b8d4-9eb48bdee179_1919_1919" alt="parabot-logo">
        </div>
        <div class="col-lg-6 mb-4 justify-content-start d-flex">
          <div class="col-9">
            <form @submit.prevent="register" id="formlogin" class="container card-body mt-4 mr-4 mb-4">
              <div class="form-group">
                <label for="emaillog"><h3 class="">Email address</h3></label>
                <input type="email" class="form-control" placeholder="Your Email Here"  v-model="email_register_input"/>
                <small id="logpref" class="form-text text-black text-left mt-1 mb-3">*We never share your email</small>
              </div>
              <div class="form-group">
                <label class="mt-4" for="passwordlog"><h3 class="">Password</h3></label>
                <input type="password" class="form-control" id="passwordlog" placeholder="Your Password Here" v-model="password_register_input"/>
              </div>
              <button type="submit" class="shadow btn btn-warning rounded-pill">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'Register',
  components: {
    Navbar
  },
  data () {
    return {
      email_register_input: '',
      password_register_input: ''
    }
  },
  methods: {
    register () {
      const payload = {
        email: this.email_register_input,
        password: this.password_register_input
      }
      this.$store.dispatch('register', payload)
    }
  }
}
</script>

<style>

</style>
