<template>
   <div class="container">
        <div class="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto" style="width:700px; height:400px;">
            <div class="col-5"> <img src="../assets/glass.png" class="card-img-top img-login rounded-circle"></div>
            <div class="col-7 ">
                <h3>Sign Up</h3>
                <form @submit.prevent="register">
                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <button type="submit" class="btn btn-primary rounded-pill float-right">Signup</button>
                  </form>
                  <span>already have account? <a @click="moveToLogin">Sign In</a></span>
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
    register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
    },
    moveToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.img-login {
  width: 20vw;
}
</style>
