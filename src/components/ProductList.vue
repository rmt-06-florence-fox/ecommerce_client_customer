<template>
  <div class="row">
    <ProductCard class="col-4 m-3"/>
    <ProductCard class="col-4 m-3"/>
    <ProductCard class="col-4 m-3"/>
    <ProductCard class="col-4 m-3"/>
    <ProductCard class="col-4 m-3"/>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
export default {
  name: 'ProductList',
  components: {
    ProductCard
  }
}
</script>

<style>

</style>
