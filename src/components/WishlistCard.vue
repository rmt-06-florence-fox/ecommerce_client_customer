<template>
    <div
      class="card mb-3 col-md-2 mr-3">
      <img class="card-img-top" :src="wishlist.Product.image_url" :alt="wishlist.Product.name" />
      <div class="card-body">
        <h5 class="card-title">{{ wishlist.Product.name }}</h5>
        <p class="card-text">{{ price }}</p>
        <div v-if="wishlist.Product.stock">
        <p><span class="badge badge-success">Stock: {{ wishlist.Product.stock }}</span></p>
          <button @click=addCart(wishlist.Product.id) class="btn btn-primary">Add to cart</button>
        </div>
        <p v-else><span class="badge badge-danger">Sold Out</span></p>
        <button @click=delWishlist(wishlist.id) class="btn btn-danger mt-3 mb-3">Delete Wishlist</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'WishlistCard',
  props: ['wishlist'],
  computed: {
    price () {
      return 'Rp. ' + this.wishlist.Product.price.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
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
    delWishlist (id) {
      this.$store.dispatch('delWishlist', id)
    }
  }
}
</script>

<style>
</style>
