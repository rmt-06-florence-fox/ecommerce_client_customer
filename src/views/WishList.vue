<template>
  <div class="container-fluid">
    <div class="row">
      <SideBar
        class="col-2"
      />
      <div class="col-10">
        <img src="https://images.unsplash.com/photo-1548594267-586635c7a815?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" class="d-block w-100" alt="" style="height: 500px; object-fit: cover;">
            <h1 class="mt-5 display-1 lead" style="text-align: center;"> Your WishList </h1>
            <div class="row">
            <WishListCard
              v-for="wish in wishes"
              :key="wish.id"
              :wish="wish"
              class="mr-3 mt-3"
            />
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import WishListCard from '../components/WishListCard'
import SideBar from '../components/SideBar'

export default {
  name: 'WishList',
  components: {
    WishListCard,
    SideBar
  },
  computed: {
    wishes () {
      return this.$store.state.wishes
    }
  },
  created () {
    this.$store.dispatch('fetchWishList')
  }
}
</script>

<style>

</style>
