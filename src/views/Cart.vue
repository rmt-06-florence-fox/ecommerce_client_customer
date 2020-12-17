<template>
  <!-- <div>
    <div class="container mt-5">
    <div class="row">
      <div class="col-4"> -->
        <!-- <div class="card shadow-sm p-3 mb-5 bg-white rounded" style="width: 18rem;">
          <h1 class="text-center">Profile</h1>
          <img :src="profile.avatar" class="card-img-top h-50 img-thumbnail" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{profile.name}}</h5>
            <p class="card-text">{{profile.occupation}}</p>
            <div class="d-flex align-items-center">
              <i class="fa fa-map-marker-alt"></i><span>{{profile.address}}</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="container">
        <h1 class="text-center">Your Cart</h1>
        <div class="row mx-auto d-flex justify-content-center" style="width:100%">
          <CartCard v-for="cart in yourCart.data" :cart="cart" :key="cart.id"/>
        </div>
      </div>
    <!-- </div>
  </div>
  </div> -->
</template>

<script>
import CartCard from '../components/CartCard'
export default {
  name: 'Cart',
  components: {
    CartCard
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  computed: {
    yourCart () {
      return this.$store.state.cart
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
