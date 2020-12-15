<template>
  <div>
    <TopBar />
    <div class="d-flex flex-column justify-content-start w-75">
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
      <CartCard />
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'
import CartCard from '../components/CartCard.vue'
export default {
  name: 'CartList',
  components: {
    TopBar,
    CartCard
  }
}
</script>

<style>

</style>
