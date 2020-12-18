<template>
    <div
      class="card mb-3 col-md-2 mr-3">
      <img class="card-img-top" :src="product.image_url" :alt="product.name" />
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ price }}</p>
        <div v-if="product.stock">
          <p><span class="badge badge-success">Stock: {{ product.stock }}</span></p>
          <button @click=addCart(product.id) class="btn btn-primary">Add to cart</button>
        </div>
        <p v-else><span class="badge badge-danger">Sold Out</span></p>
        <button @click=addWishlist(product.id) class="btn btn-success mt-3 mb-3">Add to Wishlist</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: ['product'],
  computed: {
    price () {
      return 'Rp. ' + this.product.price.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    }
  },
  methods: {
    addCart (id) {
      const payload = {
        id,
        quantity: 1
      }
      this.$store.dispatch('addOrUpdateCart', payload)
    },
    addWishlist (id) {
      this.$store.dispatch('addWishlist', id)
    }
  }
}
</script>

<style>
</style>
