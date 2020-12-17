<template>
  <b-row>
    <b-col cols="3" class="align-items-center">
    </b-col>
    <b-col class="shadow p-5">
      <h1>Register</h1>
      <hr>
      <b-form @submit.prevent="register">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password" label="Password:" label-for="Password">
        <b-form-input
          id="password"
          v-model="password"
          required
          type="password"
          placeholder="Enter password"
        ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="dark">Submit</b-button>
      </b-form>
    </b-col>
    <b-col cols="3" class="align-items-center">
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'RegisterForm',
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
        .then(({ data }) => {
          this.$swal(
            'Success!',
            'Register Success',
            'success' // success,error,warning
          )
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          this.$swal(
            'Error',
            `${err.response.status} ${err.response.data.error.split(',')}`,
            'error' // success,error,warning
          )
        })
    }
  }
}
</script>

<style>
</style>
