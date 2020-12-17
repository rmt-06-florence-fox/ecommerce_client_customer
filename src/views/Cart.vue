<template>
  <div class="row justify-center">
    <div class="col-sm col-md-4" v-if="total">
      <CartCard v-for="cart in carts" :key="cart.id" :cart="cart">
      </CartCard>
    </div>
    <div class="col-sm col-md-4 ml-3 mr-2" v-if="!total">
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">No items in your cart.</h5>
          <a href="" @click="goHome" class="btn btn-success">Let's shop</a>
        </div>
      </div>
    </div>
    <div class="col-sm col-md-4 ml-3 mr-2" v-if="total">
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">TOTAL</h5>
          <p class="card-text">{{ formatRupiah(total) }}</p>
          <a href="" v-if="carts.length" @click.prevent="checkout" class="btn btn-success">Check Out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from '../components/CartCard'
export default {
  name: 'Cart',
  methods: {
    formatRupiah (price) {
      return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(() => {
          this.$store.dispatch('fetchProducts')
          this.$store.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goHome () {
      this.$router.push('/')
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total () {
      return this.$store.state.total
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCarts')
    if (localStorage.access_token) {
      this.$store.commit('SET_IS_AUTHENTICATED', true)
    }
  },
  components: {
    CartCard
  }
}
</script>

<style>
  .justify-center {
   padding: 1rem 1rem;
   padding-bottom: 3rem;
   display: flex;
   justify-content: center;
   height: 82vh;
   overflow-y: auto;
  }
</style>
