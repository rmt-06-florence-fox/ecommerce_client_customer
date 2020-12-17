<template>
<div class="ms-3 row" style="margin-top: 150px">
  <WishCard
    v-for="(wish, i) in wishes.data"
    :key="i"
    :wish="wish"
  />
</div>
</template>

<script>
import WishCard from '../components/wishCard'
export default {
  components: {
    WishCard
  },
  methods: {
    fetchWish () {
      this.$store.dispatch('fetchWish')
    }
  },
  computed: {
    wishes () {
      return this.$store.state.wishes
    }
  },
  created () {
    this.fetchWish()
  }
}
</script>

<style>

</style>
