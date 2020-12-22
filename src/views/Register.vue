<template>
  <div>
    <div v-if="error">
          <ErrorMessage v-for="(message, index) in messages" :key="index" :message="message" ref="error"></ErrorMessage>
    </div>
    <div class="container login-page">
      <div class="container shadow login-form-background">
        <div class="container login-form-container">
          <div class="card shadow login-form-card">
            <div class="form-content">
              <div class="container">
                <h2>ShopPal - Register</h2>
              </div>
              <b-form @submit="onSubmit">

              <b-form-group
                id="input-group-1"
                label="First Name"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.first_name"
                  type="text"
                  required
                  placeholder="John"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Last Name"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.last_name"
                  type="text"
                  placeholder="Doe"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Email"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.email"
                  type="email"
                  placeholder="johndoe@mail.com"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-4" label="Password" label-for="input-4">
                <b-form-input
                  id="input-4"
                  v-model="form.password"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>
              <div class="d-flex justify-content-between">
              <b-button type="submit" id="register-btn-reg" variant="success">Register</b-button>
              <b-button type="button" id="register-btn-cancel" :to="{ name: 'Login' }" variant="dark" class="ml-2">Cancel</b-button>
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
import ErrorMessage from '../components/ErrorMessage'
import Swal from 'sweetalert2'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      error: false,
      messages: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .post('/customer/register', this.form)
        .then(({ data }) => {
          Swal.fire(
            'Registered!',
            'Please Sign In!',
            'success'
          )
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
          this.messages = err.response.data.messages
          this.error = true
          this.$nextTick(() => {
            console.log(this.$refs.error)
            this.$refs.error[0].$el.scrollIntoView()
          })
        })
    }
  },
  components: {
    ErrorMessage
  }
}
</script>
