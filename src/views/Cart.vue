<template>
  <div>
    <div class ="container-fluid">
      <div class="row">
      <SideBar
        class="col-2"
      />
      <div class="col-10">
        <img src="https://images.unsplash.com/photo-1549187805-6079facea88d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" class="d-block w-100" alt="" style="height: 700px; object-fit: cover;">
        <h1 class="mt-5 display-1 lead" style="text-align: center;"> Your Cart </h1>
        <div class="row">
          <div class="col-9 d-flex">
            <CartCard
            v-for="item in cart"
            :key="item.id"
            :item="item"
            class="mr-3 mt-5"
            style="justify-content: centre;"
            />
          </div>
          <div class="col mt-5">
            <h1 style="text-align: left;" > Total Price: {{ price }} </h1>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/SideBar'
import CartCard from '../components/CartCard'

export default {
  name: 'Cart',
  components: {
    SideBar,
    CartCard
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    price () {
      const cart = this.$store.state.cart
      let totalPrice = 0
      cart.forEach(element => {
        totalPrice += element.Product.price * element.quantity
      })
      const IDR = totalPrice.toLocaleString('EN-US', { style: 'currency', currency: 'IDR' })
      return IDR
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  created () {
    this.fetchCart()
    if (localStorage.access_token) {
      this.$store.commit('SET_LOGIN', true)
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
