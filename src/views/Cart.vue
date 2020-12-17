<template>
  <section style="margin-top: 3em">
    <h1>Your Cart</h1>
    <hr>
    <div v-if="!carts[0]" style="margin-top: 3em">
      <h3 class="mb-3">Put Some Stuff in here, it's getting dusty</h3>
      <img src="../assets/empty.svg" alt="empty cart" width="30%">
    </div>
    <div class="row mt-1 px-5" style="margin-left:3em" v-else-if="carts[0]">
      <div class="col-6">
        <CartItem
          v-for="item in carts"
          :key="item.id"
          :item="item"
        />
      </div>
      <div class="col-6">
        <div class="card mx-5 my-2" style="width:350px">
          <div class="card-body">
            <h5 class="card-subtitle text-muted">Total</h5>
            <h3 class="card-title">{{ totalPrice }}</h3>
            <button @click="checkout" class="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swal, Toast } from '../config/swal'
import CartItem from '../components/Cart_Item'

export default {
  name: 'CartPage',
  methods: {
    checkout () {
      Swal.fire({
        icon: 'question',
        title: 'You are going to checkout',
        text: 'Please check your items and the total before confirming.',
        confirmButtonText: 'Checkout',
        showCancelButton: true,
        cancelButtonColor: 'red'
      })
        .then(res => {
          if (res.isConfirmed) {
            this.$store.dispatch('checkout', this.totalPrice)
              .then(({ data }) => {
                this.$store.dispatch('getCart')
                Toast.fire({
                  icon: 'success',
                  title: data.msg,
                  text: 'Check your email or your history page for a review'
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
        })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      let total = 0
      this.carts.forEach(item => {
        total += item.Product.price * item.quantity
      })
      return new Intl.NumberFormat('id', { style: 'currency', currency: 'IDR' }).format(total)
    }
  },
  components: {
    CartItem
  },
  created () {
    this.$store.dispatch('getCart')
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.access_token && from.name !== 'Cart') {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

<style>

</style>
