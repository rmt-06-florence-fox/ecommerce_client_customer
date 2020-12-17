<template>
  <div>
    <div class="navbar navbar-light">
      <div class="nav">
        <router-link :to="{ name: 'ProductList' }"><img src="../assets/a00413be-be71-4c0b-8681-11e86aa4712c_200x200.png" width="50"></router-link>
      </div>
      <div class="nav">
          <button @click="getWishlist" class="btn mr-1" style="background-color: #5ec0ca;">
            <router-link :to="{ name: 'Wishlist' }"><i class="fa fa-heart-o" style="font-size:24px; color:white"></i></router-link>
          </button>
           <button @click="getTransactions" class="btn mr-1" style="background-color: #5ec0ca;">
            <router-link :to="{ name: 'Transactions' }"><i class="fa fa-history" style="font-size:24px; color: white"></i></router-link>
          </button>
          <button @click="getCart" class="btn mr-1" style="background-color: #5ec0ca;">
            <router-link :to="{ name: 'ShoppingCart' }"><span class="glyphicon glyphicon-shopping-cart text-white"></span></router-link>
          </button>
          <button @click="logout" class="btn" style="background-color: #5ec0ca;"><router-link to="/" class="text-white">Logout</router-link></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarDashboard',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    getWishlist () {
      this.$store.dispatch('getWishlist')
    },
    getTransactions () {
      this.$store.dispatch('getTransactions')
    }
  }
}
</script>

<style>

</style>
