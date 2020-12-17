<template>
  <div>
        <form @submit.prevent="register">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <a href="" class="btn btn-warning" @click="register">register</a>
        </form>
  </div>
</template>

<script>
import axios from '../config/axiosinstance'

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
      axios({
        url: 'register',
        method: 'POST',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          this.$router.push('/login')
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(_ => {
          this.email = ''
          this.password = ''
        })
    }
  }
}
</script>

<style>

</style>
