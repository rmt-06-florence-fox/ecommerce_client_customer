<template>
  <div class="container shadow p-5 mb-5 bg-white rounded col-6">
    <form @submit.prevent="doSignUp">
      <div class="mb-4">
        <h3>Sign Up to Han Store</h3>
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="your email address" v-model="email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="your password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return { email: '', password: '' }
  },
  methods: {
    doSignUp () {
      const payload = { email: this.email, password: this.password }
      this.$store.dispatch('doSignUp', payload)
    }
  }
}
</script>

<style>

</style>
