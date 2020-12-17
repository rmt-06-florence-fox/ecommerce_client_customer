<template>
  <div class="card mb-3 shadow" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img class="border-1 w-75 mt-2" :src="cart.Product.image_url" alt="..." >
    </div>
    <div class="col-md-6">
      <div class="card-body text-start">
        <h5 class="card-title"> <b>{{cart.Product.name}}</b></h5>
        <hr class="w-50">
        <h5 class="card-title">Rp.{{cart.Product.price}} /pcs</h5>
        <h5 class="card-title">Quantity: <button class="rounded-3 btn-outline-success" @click="minusCart({id: cart.id, quantity: cart.quantity -1})"> <i class="fa fa-angle-down" aria-hidden="true"></i></button> {{cart.quantity}} <button class="rounded-3 btn-outline-success" @click="updateCart({id: cart.id, quantity: cart.quantity +1})"> <i class="fa fa-angle-up" aria-hidden="true"></i></button> </h5>
      </div>
    </div>
    <div @click="destroy(cart.id)" class="col-md-2">
        <button type="button" class="btn-close mt-3" aria-label="Close"></button>
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
export default {
  props: ['cart'],
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    addToCart (payload) {
      this.$store.dispatch('addToCart', payload)
    },
    updateCart (payload) {
      if (this.cart.quantity >= this.cart.Product.stock) {
        Toast.fire({
          icon: 'error',
          title: 'Run out of Stock'
        })
      } else {
        this.$store.dispatch('updateCart', payload)
      }
    },
    minusCart (payload) {
      if (this.cart.quantity === 1) {
        this.destroy(payload.id)
      } else {
        this.$store.dispatch('updateCart', payload)
      }
    },
    fetchCarts () {
      this.$store.dispatch('fetchCarts')
    },
    destroy (id) {
      this.$store.dispatch('destroyCart', id)
    }
  }
}
</script>

<style>

</style>
