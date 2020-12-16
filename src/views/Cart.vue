<template>
  <div class="container mt-3">
    <div class="col-7">
      <CartCard></CartCard>
      <CartCard></CartCard>
      <CartCard></CartCard>
    </div>
    <div class="col-5">

    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard'
export default {
  name: 'Cart',
  components: {
    CartCard
  }
}
</script>

<style>
</style>
