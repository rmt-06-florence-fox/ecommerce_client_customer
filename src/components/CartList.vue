<template>
  <div class="card mb-3" style="max-width: 920px;">
    <div class="row g-0">
      <div class="col">
        <img :src="cart.Product.image_url" class="cart-img">
      </div>
      <div class="col">
        <div class="card-body">
          <h5 class="card-title">{{ cart.Product.name }}</h5>
          <p class="card-text">{{ cart.Product.price | currency }} @each</p>
          <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
            <button @click="editCart({ id: cart.id, ProductId: cart.ProductId, total: cart.Product.price, status: 'minus' })"
            type="button"
            class="btn btn-light">
            <i class='fas fa-minus-circle' style='color: #54a0ff'></i>
            </button>
            <button type="button" class="btn btn-dark" disabled>{{ cart.quantity }}</button>
            <button @click="editCart({ id: cart.id, ProductId: cart.ProductId, total: cart.Product.price, status: 'plus' })"
            type="button"
            class="btn btn-light">
            <i class='fas fa-plus-circle' style='color: #10ac84'></i>
            </button>
          </div>
            <button @click.prevent="deleteCart(cart.id)" type="button" class="btn btn-outline-danger btn-sm ml-2"><i class='far fa-trash-alt'></i></button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartList',
  props: ['cart'],
  methods: {
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    },
    editCart (payload) {
      console.log(payload, '<<<<<')
      if (this.cart.quantity === 1) {
        this.$store.dispatch('deleteCart', payload.id)
      } else {
        this.$store.dispatch('updateCart', payload)
      }
    }
  }
}
</script>

<style>
  .cart-img {
    width: 250px;
    height: 25vh;
    position: relative;
  }
</style>
