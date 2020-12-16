<template>
  <div class="card  m-3 border-0 shadow" style="width: 25rem;">
    <img class="card-img-top" :src="product.image_url" alt="Card image cap">
    <div class="card-body">
      <img src="../assets/heart2.svg" alt="" class="bottom-left-icon" @click="addToWishlist">
      <h5 class="card-title">{{product.name}}</h5>
      <p class="card-text"><strong>{{price}}</strong><br>
      stock: {{product.stock}}</p>
      <a @click="addToCart" class="btn btn-primary text-white" v-if="product.stock > 0"><span class="glyphicon glyphicon-shopping-cart"></span> Add to Cart</a>
      <a class="btn btn-secondary text-white disabled" v-else-if="product.stock <= 0">Out of Stock</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addToCart () {
      this.$store.commit('set_addToCartSuccess', null)
      this.$store.commit('set_addToCartFailed', null)
      this.$store.dispatch('addToCart', this.product)
    },
    addToWishlist () {
      this.$store.dispatch('addToWishlist', this.product)
    }
  },
  computed: {
    price () {
      let rupiah = ''
      const angkarev = this.product.price.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style>
.bottom-left-icon {
  width: 10%;
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
  cursor:pointer;
  }
</style>
