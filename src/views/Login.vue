<template>
  <div class="container-fluid pt-5">
    <div class="row pt-5">
      <div class="col-sm-4"></div>
      <div class="col-sm-4 text-center border shadow-lg pb-3">
        <h1 class="text-success pt-2">Login</h1>
        <form @submit.prevent="login" class="pt-3">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text bg-success" id="basic-addon1"><i class="fas fa-envelope text-white"></i></span>
            </div>
            <input type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
            v-model="email">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text bg-success" id="basic-addon1"><i class="fas fa-lock text-white"></i></span>
            </div>
            <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
            v-model="password">
          </div>

          <input type="submit" class="btn btn-success" value="Login">
        </form>
        <!-- <hr> -->
        <!-- Login Using Google -->
      </div>
      <div class="col-sm-4"></div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios'
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
      axios({
        url: '/login/customer',
        method: 'post',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(({ data }) => {
        this.$swal({
          icon: 'success',
          title: 'Success Logging In',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem('access_token', data.access_token)
        this.$store.dispatch('GETUSER')
        this.$store.dispatch('GETWISHLISTS')
        this.$store.dispatch('GETHISTORY')
        this.$store.dispatch('GETCART')
        this.$store.commit('FILTERINGCATEGORIES', [])
        this.$router.push('/').catch(() => { })
      }).catch(err => {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message
        })
      })
    }
  }
}
</script>
