<template>
  <section id="sign-up-page">
        <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
            <div class="p-5 bg-light shadow" style="width: 30%; height: 70%; border-radius: 10px;">
                <h2 class="text-center">Sign up here</h2>
                <img class="w-100" src="../assets/undraw_sign_in_e6hj.png" alt="login page">
                <form class="mt-4" @submit.prevent="register">
                    <div class="form-group">
                        <label for="email" class="input-group-text">Email</label>
                        <input v-model="email" class="form-control" type="email" id="sign-up-email" placeholder="your email">
                    </div>
                    <div class="form-group">
                        <label for="password" class="input-group-text">Password</label>
                        <input v-model="password" class="form-control" type="password" id="sign-up-password" placeholder="your password">
                    </div>
                    <button class="btn btn-block text-white" type="submit" style="background-color: #42b0f8;"> Register</button>
                </form>
            </div>
        </div>
    </section>
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
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
