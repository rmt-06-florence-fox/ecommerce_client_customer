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
    this.$store.dispatch('getCart')
  }
}
</script>

<style>

</style>
