<template>
  <div>
    <Navbar></Navbar>
    <div class="container p-5 mt-5">
      <div class="row">
        <div class="col-md-6 col-sm-12 mt-3">
          <b-card>
            <h1>Register</h1>
            <b-form class="m-3" @submit.prevent="onRegist">
              <b-form-group label="Email">
                <b-form-input placeholder="Enter your email" type="email" v-model="payload.email"></b-form-input>
              </b-form-group>
              <b-form-group label="Password">
                <b-form-input placeholder="Enter your password" type="password" v-model="payload.password"></b-form-input>
              </b-form-group>
              <b-button type="submit" class="btn-regist"> Sign Up</b-button>
            </b-form>
          </b-card>
        </div>
        <div class="col-md-6 col-sm-8 mt-5">
          <img src="../assets/register.svg" class="img-regist">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Login',
  components: {
    Navbar
  },
  data () {
    return {
      payload: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onRegist () {
      this.$store.dispatch('register', this.payload)
    }
  }
}
</script>

<style>
.img-regist{
  width: 300px;
}
.btn-regist{
  background-color: #38cae7 !important;
  width: 100px !important ;
}
</style>
