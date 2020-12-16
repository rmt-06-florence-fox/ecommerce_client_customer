<template>
  <div class="certain-products col-10 content">
    <Product
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import Product from './Product'
export default {
  name: 'SpesificProducts',
  computed: {
    category () {
      return this.$store.state.categories.find(element => element.name === this.$route.params.category)
    },
    products () {
      return this.$store.state.products.filter(element => element.CategoryId === this.category.id && element.stock > 0)
    }
  },
  components: {
    Product
  }
}
</script>

<style scoped>
.certain-products {
  display: flex;
  flex-wrap: wrap;
}
</style>
