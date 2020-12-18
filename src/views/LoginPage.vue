<template>
  <div class="container mt-5">
    <div class="card" style="width: 30rem;">
    <div class="card-body">
      <form id="login-form" class="input-margin" @submit.prevent="login">
        <h2 class="card-title">Login Form</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" class="form-control" name="email" id="email-input" placeholder="email" v-model="user.email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" id="password-input" placeholder="password" v-model="user.password">
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
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
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const user = this.user
      this.$store.dispatch('login', user)
    }
  },
  created () {
    this.$store.dispatch('statusLogin')
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
