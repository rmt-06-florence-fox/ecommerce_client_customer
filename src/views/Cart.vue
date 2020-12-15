<template>
  <div class="container p-3 my-3 bg-dark text-white" id="form">
      <h1> Cart </h1>
      <div id="card">
          <product-cart-card />
          <product-cart-card />
      </div>
      <div>
        <h1> Total: </h1>
        <h2> Rp. 1.000.000 </h2>
      </div>
  </div>
</template>

<script>
import ProductCartCard from '../components/ProductCartCard.vue'
export default {
  components: { ProductCartCard },
  name: 'Cart'
}
</script>

<style>

    #card {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        align-items: baseline;
        align-content: space-around;
    }

</style>
