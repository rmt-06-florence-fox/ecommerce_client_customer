<template>
  <div class="login">
    <h3 class="text-center">Tokoku</h3>
    <h5 class="text-center text-muted">Register</h5>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button @click="toLogin" type="button" class="btn btn-secondary ml-3">I have an account</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const { email, password } = this
      const payload = {
        email,
        password
      }
      this.$store.dispatch('register', payload)
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
