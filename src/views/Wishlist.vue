<template>
  <div class="wishlist-page">
      <h1 v-if="getWishlist.length == 0">You dont have wishlist</h1>
    <div class="wishlist-page-left">
      <div class="m-2 card" style="width: 18rem;" v-for="(wishlist, i) in getWishlist" :key="i">
        <img class="card-img-top" :src="wishlist.Product.image_url"  alt="Card image cap">
        <div class="card-body-wishlist">
          <h5 class="card-title">{{wishlist.Product.name}}</h5>
          <p class="card-text"></p>
          <p>{{formatRupiah(wishlist.Product.price)}}</p>
        </div>
      <img src="../assets/heart2.svg" @click="unlike(wishlist.id)" alt="" class="bottom-left-icon">
      <div class="action-button">
        <button class="btn-danger" @click="addProducToCart(wishList.Product.id)">Add to cart</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wishlist',
  methods: {
    formatRupiah (number) {
      const numberString = number.toString()
      const jumlahSisa = numberString.length % 3
      const angkaAwalString = numberString.substr(0, jumlahSisa)
      const ribuan = numberString.substr(jumlahSisa).match(/\d{3}/g)

      if (ribuan) {
        const separator = jumlahSisa ? '.' : '' // kalau ada sisa, tambahkan separator
        return 'Rp. ' + angkaAwalString + separator + ribuan.join('.')
      } else {
        return `Rp. ${angkaAwalString}`
      }
    },
    addProducToCart (id) {
      this.$store.dispatch('addProductToCart', id)
    },
    unlike (id) {
      this.$store.dispatch('unlike', id)
    }
  },
  created () {
    this.$store.dispatch('fetchWishlist')
    this.$store.commit('setLoginStatusOn')
  },
  computed: {
    getWishlist () {
      return this.$store.state.wishlists
    },
    getLoginStatus () {
      return this.$store.state.loginStatus
    }
  }
}
</script>

<style>
.bottom-left-icon {
  width: 10%;
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
  cursor:pointer;
}
</style>
