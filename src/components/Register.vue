<template>
  <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form @submit.prevent="register" class="box">
            <div class="field">
              <label for="" class="label">username</label>
              <div class="control has-icons-left">
                <input v-model="regUsername" id="regUsername" type="username" placeholder="e.g. yourusername" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input v-model="regEmail" id="regEmail" type="email" placeholder="e.g. your@email.com" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input v-model="regPassword" id="regPassword" type="password" placeholder="*******" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            <router-link to="login" class="mt-3">already have an account?</router-link>
            </div>
            <div class="field">
              <button class="button is-success">
                Register
              </button>
            </div>
          </form>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      regUsername: '',
      regEmail: '',
      regPassword: ''
    }
  },
  methods: {
    register () {
      const payload = {
        username: this.regUsername,
        email: this.regEmail,
        password: this.regPassword
      }
      console.log(payload)
      this.$store.dispatch('userRegister', payload)
    }
  }
}
</script>

<style>
</style>
