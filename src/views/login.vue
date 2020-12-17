<template>
  <div id="login-form" class="container w-50" style="margin-top: 160px">
          <div class="card text-start shadow">
            <div class="card-header" style="background-color: #5cd2b3;">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Login</a>
                </li>
                <li class="nav-item">
                  <a @click = "register" class="nav-link text-white" href="#">Register</a>
                </li>
              </ul>
            </div>
            <form @submit.prevent = "loginSubmit">
              <div class="card-body">
                <label for="email-login" class="card-title">Email</label>
                <input v-model="email" id="email-login" class="form-control" type="text" placeholder="Sleketemb@mail.com">
                <label for="password-login" class="card-title mt-3">Password</label>
                <input v-model="password" id="password-login" class="form-control" type="password">
              </div>
              <div class="row container ml-2 mb-3">
                <button class="btn btn-lg text-white" style="background-color: #5cd2b3;">Login</button>
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
    loginSubmit () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.email = ''
      this.password = ''
    },
    register () {
      this.$router.push('/register')
    },
    changeIsLogin () {
      this.$store.commit('backLogin')
    }
  },
  created () {
    this.changeIsLogin()
  }

}
</script>

<style>

</style>
