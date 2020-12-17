<template>
  <div>
      <Alerts/>
      <LoginForm v-if="currentRouteName === 'Login'"/>
      <RegisterForm v-if="currentRouteName === 'Register'"/>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import Alerts from './Alert'
export default {
  name: 'LoginPage',
  components: {
    LoginForm, RegisterForm, Alerts
  },
  data () {
    return {
      page: 'login'
    }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>

<style>

</style>
