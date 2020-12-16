<template>
  <div class="card  m-3 border-0 shadow" style="width: 25rem;">
    <img :src="wishlist.Product.image_url" class="card-img-top" alt="Card image cap">
    <div class="card-body">
      <img @click="deleteWishlist" src="../assets/heart2.svg" alt="" class="bottom-left-icon">
      <h5 class="card-title">{{wishlist.Product.name}}</h5>
      <p class="card-text"><strong>{{price}}</strong><br>
      stock: {{wishlist.Product.stock}}</p>
      <a @click="addToCart" class="btn btn-primary text-white" v-if="wishlist.Product.stock > 0"><span class="glyphicon glyphicon-shopping-cart"></span> Add to Cart</a>
      <a class="btn btn-secondary text-white disabled" v-else-if="wishlist.Product.stock <= 0">Out of Stock</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishlistCard',
  props: ['wishlist'],
  methods: {
    addToCart () {
      this.$store.commit('set_addToCartSuccess', null)
      this.$store.commit('set_addToCartFailed', null)
      this.$store.dispatch('addToCart', this.wishlist.Product)
    },
    deleteWishlist () {
      this.$store.dispatch('deleteWishlist', this.wishlist.Product)
    }
  },
  computed: {
    price () {
      let rupiah = ''
      const angkarev = this.wishlist.Product.price.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style>

</style>
