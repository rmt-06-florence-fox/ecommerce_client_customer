<template>
    <div class="px-2 max-w-xs mx-auto bg-white overflow-hidden border-2 border-transparent hover:border-black">
        <div class=" py-2 bg-white">
          <!-- {{wishlisted}} -->
            <h1 class="text-black font-bold text-sm capitalize ">{{product.name}}</h1>
        </div>
        <div>
        <img class="h-48 w-full object-cover" :src="product.image_url" alt="NIKE AIR" id="product">
        <div class="flex justify-between">
        <span @click="addToWish"><i :class="returnHeart"></i></span>
        <span v-if="product.stock" class="font-semibold">{{product.stock}} items left</span>
        <span v-else class="text-gray-600">Out of Stock</span>
        </div>
        </div>

        <div class="flex items-center justify-between py-2 bg-white">
            <h1 class="text-black font-bold text-sm">{{priceConverted}}</h1>
            <button @click="goToCart" class="px-2 py-1 bg-black text-xs text-white font-semibold uppercase border-transparent border-2 hover:bg-white hover:text-black hover:border-black focus:bg-white "><i class="lni lni-cart"></i></button>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'

export default {
  name: 'productCard',
  props: ['product'],
  methods: {
    goToCart () {
      if (localStorage.getItem('access_token')) {
        axios({
          method: 'post',
          url: `/cart/${this.product.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            amount: 1
          }
        })
          .then(res => {
            this.$router.push('/cart')
          })
          .catch(err => {
            this.$store.commit('setAddCartErr', err.response.data.message)
            setTimeout(() => {
              this.$store.commit('setAddCartErr', null)
            }, 3000)
            console.log(err.response.data.message)
          })
      } else {
        this.$router.push('/login')
      }
    },
    addToWish () {
      if (!localStorage.getItem('access_token')) { this.$router.push('/login') }
      if (this.wishlisted) {
        this.$store.commit('setAddCartErr', 'You already have this item on wishlist')
        setTimeout(() => { this.$store.commit('setAddCartErr', null) }, 3000)
      } else {
        axios({
          method: 'post',
          url: `/product/wishlist/${this.product.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(res => {
            this.$store.dispatch('loadProducts')
            this.$store.dispatch('loadWishLists')
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request)
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message)
            }
            console.log(error.config)
          })
      }
    }
  },
  computed: {
    priceConverted () {
      return 'Rp. ' + this.product.price
        .toString()
        .split('')
        .reverse()
        .map((el, i) => i % 3 === 0 && i !== 0 ? `${el}.` : el)
        .reverse()
        .join('') + ',00'
    },
    wishlisted () {
      if (this.$store.state.wishlists) {
        let isWishListed = false
        this.$store.state.wishlists.forEach(el => {
          if (el.ProductId === this.product.id) isWishListed = true
        })
        return isWishListed
      } else {
        return false
      }
    },
    returnHeart () {
      if (this.wishlisted) {
        return 'lni lni-heart-filled'
      } else {
        return 'lni lni-heart'
      }
    }
  }
}
</script>

<style>
#product {
  object-fit: cover;
}
</style>
