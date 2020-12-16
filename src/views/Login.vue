<template>
  <div>
      <LoginForm v-if="page == 'login'" @changePage="changePage"/>
      <RegisterForm v-if="page == 'register'" @changePage="changePage"/>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
export default {
  name: 'LoginPage',
  components: {
    LoginForm, RegisterForm
  },
  data () {
    return {
      page: 'login'
    }
  },
  methods: {
    changePage () {
      if (this.page === 'login') this.page = 'register'
      else this.page = 'login'
    }
  }
}
</script>

<style>

</style>
