<template>
  <div
    v-if="wishlists.length"
    class="row justify-content-md-center">
      <WishlistCard
      v-for="wishlist in wishlists"
      :key="wishlist.id"
      :wishlist="wishlist"></WishlistCard>
  </div>
  <div v-else>
    <h1>Data Not Found</h1>
  </div>
</template>

<script>
import WishlistCard from '../components/WishlistCard'
export default {
  name: 'Wishlists',
  components: { WishlistCard },
  computed: {
    wishlists () {
      return this.$store.state.wishlists
    }
  },
  created () {
    this.$store.dispatch('fetchWishlists')
  }
}
</script>

<style>
</style>
