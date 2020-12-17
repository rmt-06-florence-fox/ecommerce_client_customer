<template>
  <div>
    <Alerts/>
    <CartBody/>
  </div>
</template>

<script>
import Alerts from './Alert'
import CartBody from '../components/CartBody'
export default {
  name: 'CartPage',
  components: {
    Alerts, CartBody
  },
  created () {
    if (localStorage.getItem('access_token')) this.$store.commit('SET_isLogin', true)
    this.$store.dispatch('getCart')
  }
}
</script>

<style>

</style>
