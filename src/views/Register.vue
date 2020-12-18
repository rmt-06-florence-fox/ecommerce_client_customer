<template>
  <div id="register" class="container-fluid">
    <div class="register">
        <img src="../assets/gambar2.jpg" class="front-img">
    </div>
    <div class="register-form">
      <form @submit.prevent="register">
        <div class="form-group">
            <label for="email-register">Email address</label>
            <input v-model="email" type="email" class="form-control">
        </div>
        <div class="form-group">
            <label for="password-register">Password</label>
            <input v-model="password" type="password" class="form-control">
        </div>
        <div class="d-grid gap-2 mt-4">
          <button type="submit" class="btn btn-info">Register</button>
        </div>
      </form>
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
    }
  }
}
</script>

<style>
  #register {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }
</style>
