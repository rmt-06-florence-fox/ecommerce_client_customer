<template>
  <div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <div class="media-center">
          <figure class="image is-96x96">
            <img :src="cart.Product.image_url" alt="Placeholder image">
          </figure>
        </div>
        <div class="content">
          <h5>{{ cart.Product.name }}</h5>
          <h5>{{ cart.Product.price }}</h5>
          <div class="row">
            <button @click.prevent="changeValue(-1)" class="button">-</button>{{ cart.quantity }}
            <button @click.prevent="changeValue(1)" class="button">+</button>
          </div>
            <button
              @click.prevent="deleteCart(cart.id)"
            class="button mt-2"> DELETE </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart'],
  methods: {
    changeValue (value) {
      const payload = {
        ProductId: this.cart.Product.id,
        quantity: value
      }
      this.$store.dispatch('addToCart', payload)
    },
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    }
  }
}
</script>

<style scoped>
</style>
