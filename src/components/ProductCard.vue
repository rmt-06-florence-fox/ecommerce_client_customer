<template>
  <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <div class="media-center">
          <figure class="image is-96x96">
            <img :src="product.image_url" alt="Placeholder image">
          </figure>
        </div>
        <div class="content">
          <h5>{{ product.name }}</h5>
          <h5>{{ product.stock }}</h5>
          <h5>{{ product.price }}</h5>
        </div>
        <button
          @click.prevent="addToCart"
          class="button">
          add to cart
        </button>
      </div>
    </div>
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
</style>
