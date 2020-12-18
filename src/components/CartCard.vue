<template>
  <div class="card col-3 m-2 border-0 shadow" style="width: 18rem;">
    <div class="m-2 bottom-left-icon d-flex justify-content-end">
      <a style="cursor: pointer" @click.prevent="removeCart(cart.id)">x</a>
    </div>
    <img :src="cart.Product.image_url" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{cart.Product.name}}</h5>
      <p class="card-text">Price: {{cart.Product.price}}</p>
      <div class="row d-flex justify-content-center">
        <a @click.prevent="updateCart(cart.id)" class="btn btn-primary mr-3 text-white m-1 d-flex justify-content-center" style="cursor: pointer; width: 30px; height: 34px">-</a>
        <p class="mt-2" style="height: 35px">{{cart.quantity}}</p>
        <a @click.prevent="addToCart(cart.ProductId)" class="btn btn-primary ml-3 text-white m-1 d-flex justify-content-center" style="cursor: pointer; width: 30px; height: 34px">+</a>
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
    },
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
    }
  }
}
</script>

<style>

</style>
