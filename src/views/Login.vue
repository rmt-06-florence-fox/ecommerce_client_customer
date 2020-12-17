<template>
   <div class="container">
        <div class="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto" style="width:700px; height:400px;">
            <div class="col-5"> <img src="../assets/glass.png" class="card-img-top img-login rounded-circle"></div>
            <div class="col-7 ">
                <h3>Sign In</h3>
                <form @submit.prevent="login">
                    <div class="form-group">
                      <label for="email">Email address</label>
                      <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <button type="submit" class="btn btn-primary rounded-pill float-right">Login</button>
                  </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
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
      this.$store.dispatch('customerLogin', payload)
    }
  }
}
</script>

<style>
.img-login {
  width: 20vw;
}
</style>
