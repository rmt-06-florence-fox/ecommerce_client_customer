<template>
  <div class="card m-2 border-0 shadow" style="width: 18rem;">
    <img :src="product.image_url" class="card-img-top mt-3 mx-auto" alt="...">
    <div class="card-body">
        <small>{{ product.name }}</small><br>
        <small>Available Stock: {{ product.stock }} unit</small><br>
        <small>Price: Rp {{ convertPrice }}</small><br>
        <a class="btn btn-primary" v-if="isLogin && product.stock !== 0" @click="addCart(product)">Add to cart</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCards',
  props: ['product'],
  methods: {
    addCart (product) {
      this.$store.dispatch('addCart', product)
    }
  },
  computed: {
    listCarts () {
      return this.$store.state.listCarts
    },
    convertPrice () {
      return this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
  img{
    max-height: 300px;
    max-width: 200px;
  }
</style>
