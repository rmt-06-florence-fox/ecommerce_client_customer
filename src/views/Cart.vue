<template>
  <div class="row cart">
    <div class="col-sm col-md-4">
      <CartCard v-for="cart in carts" :key="cart.id" :cart="cart">
      </CartCard>
    </div>
    <div class="col-sm col-md-4 ml-3 mr-2">
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">TOTAL</h5>
          <p class="card-text">{{ formatRupiah(total) }}</p>
          <a href="" v-if="carts.length" @click.prevent="checkout" class="btn btn-success">Check Out</a>
          <a href="" v-if="!carts.length" @click.prevent="" class="btn btn-dark">No Items in Cart</a>
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
  .cart {
   padding: 1rem 1rem;
   padding-bottom: 3rem;
   display: flex;
   justify-content: center;
   height: 82vh;
   overflow-y: auto;
   /* height: 24rem; */
  }
</style>
