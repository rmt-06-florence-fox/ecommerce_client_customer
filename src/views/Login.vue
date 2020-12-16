<template>
  <div class="container shadow p-5 mb-5 bg-white rounded col-6">
    <form @submit.prevent="doSignIn">
      <div class="mb-4">
        <h3>Han Store</h3>
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="enter your email" v-model="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="enter your password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return { email: '', password: '' }
  },
  methods: {
    doSignIn () {
      const payload = { email: this.email, password: this.password }
      this.$store.dispatch('doSignIn', payload)
    }
  }
}
</script>
