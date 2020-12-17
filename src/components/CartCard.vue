<template>
 <div class="card m-3 col-3" style="width: 18rem;">
    <img :src="cart.Product.image_url" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{cart.Product.name}}</h5>
      <p class="card-text"></p>
      <p class="card-text"></p>
      <div>
        <a @click.prevent="updateCart(cart.id)" class="btn btn-primary mr-3 text-white m-1" style="cursor: pointer; width: 40px">-</a>
        {{cart.quantity}}
        <a @click.prevent="addToCart(cart.ProductId)" class="btn btn-primary ml-3 text-white m-1" style="cursor: pointer; width: 40px">+</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart'],
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    },
    updateCart (id) {
      this.$store.dispatch('updateCart', id)
    }
  }
}
</script>

<style>

</style>
