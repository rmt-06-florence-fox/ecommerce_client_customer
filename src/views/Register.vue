<template>
  <div class="container-register">
    <form id="registerForm" @submit.prevent="register">
      <h2>Bukatelapak.com</h2>
      <hr>
      <h5>Silakan daftarkan akunmu</h5>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="yourname@example.com">
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="*******">
      </div>
      <button type="submit" class="btn btn-outline-dark">Submit</button>
      <br><br><br>
      <p>Already a user? login <a href="/login" role="button">here.</a></p>
    </form>
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
.container-register {
  display: flex;
  justify-content: center
}

#registerForm {
    width: 450px;
    border: 1px solid gray;
    padding: 5px 20px;
    border-radius: 10px;
    font-family: 'Courier New', Courier, monospace;
}

#registerForm h2 {
    text-align: center;
    margin: 10px;
    font-weight: bolder;
}

#registerForm > p > a {
    text-decoration: underline;
}

#registerForm > p > a:hover {
    text-decoration: underline;
    font-weight: bolder;
}
</style>
