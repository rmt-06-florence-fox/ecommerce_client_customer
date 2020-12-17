<template>
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
            <b-button type="submit" variant="success">Register</b-button>
            <b-button type="button" :to="{ name: 'Login' }" variant="dark" class="ml-5">Cancel</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axiosinstance'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios
        .post('/customer/register', this.form)
        .then(({ data }) => {
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
