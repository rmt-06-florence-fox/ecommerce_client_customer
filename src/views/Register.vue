<template>
    <div>
        <div class="col-sm-4 container" style="box-shadow: 0px 0px 10px;">
            <div style="height: 30px;"></div>
            <img width="150" height="150" src="../assets/register.svg" alt="">
            <h2 class="row justify-content-md-center mt-5">Create Your Account</h2>
            <div class="row justify-content-md-center">
            <div class="col col-sm-8" style="margin: 10%">
        <form @submit.prevent="register">
        <div class="form-group">
            <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" required placeholder="Email">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" v-model="password" placeholder="Password">
        </div><br>
        <button type="submit" class="btn btn-primary">Register</button><br>
        </form>
        <button class="row justify-content-md-end btn btn-link text-dark row" @click="backLogin"><strong>Back to Login</strong></button>
            </div>
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
    backLogin () {
      this.$router.push('/login')
    },
    register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    }
  }

}
</script>
