<template>
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto" style="width:700px; height:400px;">
            <div class="col-5"> <img src="https://media.guitarcenter.com/is/image/MMGS7/Les-Paul-Standard-60s-Electric-Guitar-Unburst/L54578000003000-00-290x290.jpg" class="card-img-top rounded-circle"></div>
            <div class="col-7 ">
                <h3>Register</h3>
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div><br>
                    <button type="submit" class="btn btn-primary rounded-pill float-right">Register</button>
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

</style>
