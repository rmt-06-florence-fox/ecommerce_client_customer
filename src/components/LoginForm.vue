<template>
  <b-row>
    <b-col cols="3" class="align-items-center">
    </b-col>
    <b-col class="shadow p-5">
      <h1>Login</h1>
      <hr>
      <b-form @submit.prevent="login">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="email"
          description="Login with your email address"
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
  name: 'LoginForm',
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
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$swal(
            'Login Success!',
            'Happy shopping',
            'success' // success,error,warning
          )
          this.$router.push({ name: 'Home' })
          this.$store.commit('setStatus', true)
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
