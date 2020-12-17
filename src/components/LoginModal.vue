<template>
  <b-modal id="modal-login" title="Login"
    @ok="doLogin"
    v-if="show"
  >
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
    </b-form>
    <a @click.prevent="goToRegister" href="">register</a>
  </b-modal>
</template>

<script>
export default {
  name: 'LoginModal',
  data () {
    return {
      email: '',
      password: '',
      show: true
    }
  },
  props: [],
  methods: {
    doLogin () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
    },
    goToRegister () {
      // console.log(this.$route.path)
      this.$bvModal.hide('modal-login')
      if (this.$route.path !== '/register') {
        this.$router.push('/register')
      }
    }
  },
  created () {
    this.show = true
    // this.email = ''
    this.password = ''
  }
}
</script>

<style>

</style>
