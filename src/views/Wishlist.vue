<template>
  <div class="justify-center">
    <div class="home row row-cols-1 row-cols-md-4 g-4 ml-2 mr-2" v-if="histories.length">
      <WishlistCard v-for="wishlist in inStockWishlists" :key="wishlist.id" :wishlist="wishlist">
      </WishlistCard>
      <div v-if="noStockCarts.length">
        <h5 v-if="noStockCarts.length === 1">The following product is out of stock.</h5>
        <h5 v-else>The following products are out of stock.</h5>
        <WishlistCard v-for="wishlist in noStockWishlists" :key="wishlist.id" :wishlist="wishlist">
        </WishlistCard>
      </div>
    </div>
    <div class="col-sm col-md-4 ml-3 mr-2" v-if="!histories.length">
      <div class="card mt-4">
        <div class="card-body">
          <h5 class="card-title">No transaction history.</h5>
          <a href="" @click="goHome" class="btn btn-success">Let's shop</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WishlistCard from '../components/WishlistCard'
export default {
  name: 'Wishlist',
  methods: {
    goHome () {
      this.$router.push('/')
    }
  },
  computed: {
    inStockWishlists () {
      return this.$store.state.inStockWishlists
    },
    noStockWishlists () {
      return this.$store.state.noStockWishlists
    },
  },
  created () {
    this.$store.dispatch('fetchWishlists')
    if (localStorage.access_token) {
      this.$store.commit('SET_IS_AUTHENTICATED', true)
    }
  },
  components: {
    WishlistCard
  }
}
</script>

<style>
  .card {
   min-width: 15rem;
  }

  .home-container {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .justify-center {
   padding: 1rem 1rem;
   padding-bottom: 3rem;
   display: flex;
   justify-content: center;
   height: 82vh;
   overflow-y: auto;
  }
</style>
