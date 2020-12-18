<template>
<div class="column mx-3 my-3">
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="product.image_url" alt="Image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content is-small">
        <small>product name:</small>
        <h5>{{ product.name }}</h5>
        <small>product stock:</small>
        <h5>{{ product.stock }}</h5>
        <small>product price:</small>
        <h5>{{ product.price }}</h5>
      </div>
    </div>
    <footer class="card-footer">
      <button @click.prevent="addToCart" class="card-footer-item">
        add to cart
      </button>
    </footer>
  </div>
</div>

</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addToCart () {
      const payload = {
        ProductId: this.product.id,
        quantity: 1
      }
      this.$store.dispatch('addToCart', payload)
    }
  }
}
</script>

<style scoped>
card {
  width: 50%
}
</style>
