<template>
  <div class="wishlists">
    <Navbar />
    <h1 class="mt-4 mb-4 ml-5 text-left"><i class='far fa-heart' style='font-size:36px;color:red'></i> Your Wishlists :</h1>
    <div v-if="wishlists">
      <div class="container mt-4">
        <div class="row">
          <WishlistCard v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <img src="https://2.bp.blogspot.com/-QfSOClZc8r0/XNr6srFlzjI/AAAAAAAAGlA/lzs505eFFiEdyAytzKkMabdUTihKywcqwCLcBGAs/s1600/EXAM360%2B-%2BNo%2BWishlist.png" alt="empty-wishlist" class="empty-wishlist">
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import WishlistCard from '../components/WishlistCard'

export default {
  name: 'Wishlists',
  components: {
    Navbar,
    WishlistCard
  },
  computed: {
    wishlists () {
      if (this.$store.state.wishlists.length === 0) {
        return null
      } else {
        return this.$store.state.wishlists
      }
    }
  },
  methods: {
    getWishlists () {
      this.$store.dispatch('fetchWishlists')
    }
  },
  created () {
    this.getWishlists()
  }
}
</script>

<style>

</style>
