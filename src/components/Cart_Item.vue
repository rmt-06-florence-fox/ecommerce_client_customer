<template>
  <div class="card flex-row flex-wrap my-2">
    <div class="card-header border-0">
        <img :src="item.Product.image_url" alt="image" height="150px" width="200px">
    </div>
    <div class="card-block pt-4 pl-2" style="width: 300px">
        <h4 class="card-title"><strong>{{ item.Product.name }}</strong></h4>
        <p class="card-text">{{ toCurrency }} each</p>
        <div>
          <button @click="updateCart(-1)" class="btn btn-sm btn-dark" :disabled="hideButtonMinus">-</button>
          <span class="mx-2">{{item.quantity}}</span>
          <button @click="updateCart(1)" class="btn btn-sm btn-dark" :disabled="hideButtonPlus">+</button>
          <button @click="deleteCart(item.id)" class="btn btn-sm btn-outline-danger ml-2">Remove from cart</button>
        </div>
    </div>
  </div>
</template>

<script>
import { Swal, Toast } from '../config/swal'
export default {
  name: 'CartItem',
  props: ['item'],
  computed: {
    toCurrency () {
      return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(this.item.Product.price)
    },
    hideButtonPlus () {
      if (this.item.Product.stock === this.item.quantity) {
        return true
      } else {
        return false
      }
    },
    hideButtonMinus () {
      if (this.item.quantity === 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    updateCart (qty) {
      const payload = {
        ProductId: this.item.ProductId,
        quantity: qty
      }
      this.$store.dispatch('updateCart', payload)
        .then(({ data }) => {
          this.$store.dispatch('getCart')
          Toast.fire({
            icon: 'success',
            title: 'update quantity success'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: err.response.data.msg
          })
        })
    },
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
        .then(({ data }) => {
          this.$store.dispatch('getCart')
          Toast.fire({
            icon: 'success',
            title: data.msg
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: err.response.data.msg
          })
        })
    }
  }
}
</script>

<style>
img {
  object-fit: contain;
}
</style>
