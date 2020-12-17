<template>
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto" style="width:700px; height:400px;">
            <div class="col-5"> <img src="https://media.guitarcenter.com/is/image/MMGS7/Les-Paul-Standard-60s-Electric-Guitar-Unburst/L54578000003000-00-290x290.jpg" class="card-img-top rounded-circle"></div>
            <div class="col-7 ">
                <h3>Log In</h3>
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div><br>
                    <button type="submit" class="btn btn-primary rounded-pill float-right">Login</button><br><br>
                    <div class="text-center">
                        <span>Don't have account yet?<router-link to="/register"> Register here</router-link></span>
                    </div>
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
  }
}
</script>

<style>

</style>
