<template>
  <div class="row">
    <div class="col-8">
      <img src="https://png.pngtree.com/png-vector/20200410/ourmid/pngtree-online-shopping-concept-for-landing-page-or-e-commerce-site-png-image_2181567.jpg" width="700px" height="700px" class="mt-5">
    </div>
    <div class="col-4">
      <div v-if="errors" class="text-center mr-5">
        <div class="alert alert-danger alert-dismissible">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <strong>Failed!</strong> {{errors.message}}
        </div>
      </div>
      <div class="text-center mt-5">
        <img src="../assets/a00413be-be71-4c0b-8681-11e86aa4712c_200x200.png" style="width: auto;" class="mx-auto">
        <h3 style="font-family: 'Russo One', sans-serif; color: #5ec0ca; font-size: xx-large;">Login</h3>
        <form id="submit-login-form" class="mr-5 ml-5" @submit.prevent="login">
          <div class="text-center">
            <span>Don't have account yet?<router-link to="/register"> Register here</router-link></span>
          </div><br>
          <div class="form-group">
            <input type="email" class="form-control" id="email-login" placeholder="Enter email" v-model="email">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="pwd-login" placeholder="Enter password" v-model="password">
          </div>
          <button type="submit" class="btn btn-info">Login</button>
        </form>
      </div>
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
    login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors
    }
  }
}
</script>

<style>

</style>
