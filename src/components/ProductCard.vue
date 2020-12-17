<template>
    <div class="px-2 max-w-xs mx-auto bg-white overflow-hidden border-2 border-transparent hover:border-black">
        <div class=" py-2 bg-white">
            <h1 class="text-black font-bold text-sm capitalize ">{{product.name}}</h1>
        </div>
        <div>
        <img class="h-48 w-full object-cover" :src="product.image_url" alt="NIKE AIR" id="product">
        <i class="lni lni-heart"></i>
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
    }
  }
}
</script>

<style>
#product {
  object-fit: cover;
}
</style>
