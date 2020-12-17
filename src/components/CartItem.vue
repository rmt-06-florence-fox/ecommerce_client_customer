<template>
<div class="container">
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters row mx-auto d-flex justify-content-center">
    <div class="col-md-4">
      <img :src="cart.Product.image_url" class="card-img mt-2 ml-2" alt="">
      <button type="submit" class="btn btn-success btn-center mt-4 mb-2 ml-3" @click="updateCart()">Update Cart</button>
      <button type="submit" class="btn btn-danger btn-center mb-2 ml-3" @click="removeCart(`${cart.id}`)">Remove Cart</button>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title bold"><strong>{{ cart.Product.name }}</strong></h5>
        <hr>
        <p class="card-text btn btn-success">Price: {{ cart.Product.price }}</p>
        <p class="btn btn-outline-primary"><small>Stock: {{ cart.Product.stock }} </small></p>
        <p class="card-text"><small class="text-muted">[total]: {{ cart.quantity }} x {{ cart.Product.price }} = {{ cart.total_unit }} </small></p>
          <p class="mb-1">amount: {{ quantity }}</p>
          <button class="btn btn-secondary" @click="decrement">-</button>
          <button class="btn btn-secondary" @click="increment">+</button>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'CartItem',
  props: ['cart'],
  computed: {
    ...mapState([
      'carts'
    ])
  },
  data () {
    return {
      quantity: ''
    }
  },
  methods: {
    updateCart () {
      const payload = {
        id: this.cart.Product.id,
        quantity: this.quantity
      }
      if (this.quantity > 0) {
        this.$store.dispatch('updateCart', payload)
      } else {
        Swal.fire('Failed', 'Please input a valid amount', 'error')
      }
    },
    removeCart (id) {
      this.$store.dispatch('deleteCart', id)
    },
    increment () {
      this.quantity++
    },
    decrement () {
      this.quantity--
    }
  },
  created () {
    this.quantity = this.cart.quantity
  }
}
</script>

<style>

</style>
