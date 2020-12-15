<template>
  <div>
    <b-container class="mt-5">
      <b-row align-v="center" align-h="center">
        <b-col cols="6">
          <h1 class="mb-5">Registration Form</h1>
          <b-card>
            <b-form>
              <b-form-group
                label="Email"
                description="we will definitely sell your data for profit"
              >
                <b-form-input
                  v-model="email"
                  type="email"
                  placeholder="enter your email"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Password"
                description="at least 6 characters"
              >
                <b-form-input
                  v-model="password"
                  type="password"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary" @click.prevent="doRegister">Register</b-button>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
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
    doRegister () {
      const payload = {
        email: this.email,
        password: this.password
      }
      console.log(payload)
    }
  }
}
</script>

<style>

</style>
