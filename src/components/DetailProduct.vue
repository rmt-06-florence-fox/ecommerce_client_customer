<template>
<div class="row">
  <div class="col-4">
      <div class="card m-3 mt-5" style="width: 18rem;">
        <img :src="product.image_url" class="card-img-top img" alt="gambar product">
        <div class="card-body">
          <h5 class="card-title">Name: {{ product.name }}</h5>
          <p class="card-text">Price: {{ toLocalStringPrice(product.price) }}</p>
          <p class="card-text">Stock: {{ product.stock }}</p>
          <button class="btn btn-primary" @click.prevent="addToCart(product.id)">Add to Cart</button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'DetailProduct',
  props: ['product'],
  methods: {
    addToCart (payload) {
      this.$store.dispatch('addToCart', payload)
    },
    toLocalStringPrice (price) {
      const newPrice = price.toLocaleString('EN-US', { style: 'currency', currency: 'USD' })
      return newPrice
    }
  }
}
</script>

<style scoped>
.img {
  height: 10rem;
}
</style>
