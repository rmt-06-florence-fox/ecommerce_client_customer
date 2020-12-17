<template>
  <div class="container-login">
    <form id="loginForm" @submit.prevent="login">
      <h2>Bukatelapak.com</h2>
      <hr>
      <h5>Silakan masuk ke dalam akun kamu</h5>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourname@example.com">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="*******">
      </div>
      <button type="submit" class="btn btn-outline-dark">Sign in</button>
      <br><br><br>
      <p>Don't have account? register <a href="/register" role="button">here.</a></p>
    </form>
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
.container-login {
  display: flex;
  justify-content: center;
}

#loginForm, #registerForm {
    width: 450px;
    border: 1px solid gray;
    padding: 5px 20px;
    border-radius: 10px;
    font-family: 'Courier New', Courier, monospace;
}

#loginForm h2 {
    text-align: center;
    margin: 10px;
    font-weight: bolder;
}

#loginForm > p > a {
    text-decoration: underline;
}

#loginForm > p > a:hover {
    text-decoration: underline;
    font-weight: bolder;
}
</style>
