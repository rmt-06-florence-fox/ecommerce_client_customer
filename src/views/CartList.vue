<template>
  <div>
    <div class="sticky-top">
      <TopBar />
      <div class="d-flex justify-content-end mt-3 mr-3">
        <b-button variant="dark" @click="checkout"> Check Out </b-button>
      </div>
    </div>
    <div class="d-flex flex-column justify-content-start w-75">
      <CartCard v-for="cart in carts" :key="cart.id" :cart="cart" />
    </div>
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'
import CartCard from '../components/CartCard.vue'
export default {
  name: 'CartList',
  components: {
    TopBar,
    CartCard
  },
  computed: {
    carts () {
      // this.fetchCarts()
      return this.$store.state.carts
    }
  },
  methods: {
    fetchCarts () {
      this.$store.dispatch('fetchMyCarts')
    },
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  created () {
    this.fetchCarts()
  }
}
</script>

<style>

</style>
