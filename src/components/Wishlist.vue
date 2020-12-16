<template>
  <div class="wishlist col-10 content">
    <Product
      v-for="wish in wishlist"
      :key="wish.id"
      :product="wish.Product"
    />
  </div>
</template>

<script>
import Product from './Product'
export default {
  name: 'Wishlist',
  computed: {
    wishlist () {
      return this.$store.state.wishlist
    }
  },
  components: {
    Product
  }
}
</script>

<style scoped>
.wishlist {
  display: flex;
  flex-wrap: wrap;
}
</style>
