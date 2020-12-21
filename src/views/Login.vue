<template>
  <div>
    <div v-if="error">
      <ErrorMessage :message="message" ref="error"></ErrorMessage>
    </div>
    <div class="container login-page">
      <div class="container shadow login-form-background">
        <div class="container login-form-container">
          <div class="card shadow login-form-card">
            <div class="form-content">
              <div class="container">
                <h2>ShopPal - Login</h2>
              </div>
              <b-form @submit="onSubmit">
              <b-form-group
                id="input-group-1"
                label="Email"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Enter email"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Password" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Enter password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="dark" id="login-btn-login" class="mb-2">Sign In</b-button>
              <div class="d-flex justify-content-between mb-4">
                <b-button type="button" @click="goRegister" variant="info" id="login-btn-reg" class="mr-2">Register</b-button>
                <b-button type="button" @click="goHome" variant="danger" id="login-btn-cancel">Store</b-button>
              </div>
              <div id="btn-google-container">
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
              </div>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axiosinstance'
import GoogleLogin from 'vue-google-login'
import ErrorMessage from '../components/ErrorMessage'
import Swal from 'sweetalert2'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: false,
      message: '',
      params: {
        client_id: '861795519447-17vmd84rog7jj1k0q31k1j1n10nbj6sm.apps.googleusercontent.com'
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 230,
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .post('/customer/login', this.form)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          return axios.get('/customer/profile', { headers: { access_token: localStorage.getItem('access_token') } })
        })
        .then(({ data }) => {
          Swal.fire(
            'Signed In!',
            'Welcome!',
            'success'
          )
          this.$store.commit('SET_IS_AUTHENTICATED', true)
          this.$store.commit('SET_USERNAME', data.fullName)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err)
          this.message = err.response.data.message
          this.error = true
          this.$nextTick(() => {
            this.$refs.error.$el.scrollIntoView()
          })
        })
    },
    onSuccess (googleUser) {
      const googleToken = googleUser.getAuthResponse().id_token
      axios
        .post('/customer/googleLogin', { googleToken })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          return axios.get('/customer/profile', { headers: { access_token: localStorage.getItem('access_token') } })
        })
        .then(({ data }) => {
          Swal.fire(
            'Logged In!',
            'Welcome!',
            'success'
          )
          this.$store.commit('SET_IS_AUTHENTICATED', true)
          this.$store.commit('SET_USERNAME', data.fullName)
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        })
    },
    goRegister () {
      this.$router.push('/register')
    },
    goHome () {
      this.$router.push('/')
    }
  },
  components: {
    GoogleLogin,
    ErrorMessage
  }
}
</script>
