<template>
  <div class="home">
    <h1 class="text-center">My Shopping Cart</h1>
    <ProductCart
      v-for="cartProduct in carts"
      :key="cartProduct.id"
      :CartProducts="cartProduct"
    ></ProductCart>
  </div>
</template>

<script>
import ProductCart from '@/components/ProductCart.vue'

export default {
  name: "MyCart",
  components: {
    ProductCart,
  },
  created() {
    this.$store.dispatch("fetchCarts");
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
  },
};
</script>

<style>
</style>