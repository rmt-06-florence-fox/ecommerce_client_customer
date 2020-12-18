<template>
     <tr>
        <!-- {{getWishedProduct}} -->
        <td class="hidden pb-4 md:table-cell">
            <a href="#">
            <img :src="getWishedProduct.image_url" class="w-20 rounded" alt="Thumbnail">
            </a>
        </td>
        <td>
            <a href="#">
            <p class="mb-2 md:ml-4">{{getWishedProduct.name}}</p>
                <button type="button" class="text-gray-700 md:ml-4" @click="deleteThis">
                <small>(Remove item)</small>
                </button>
            </a>
        </td>
        <td class="hidden text-right md:table-cell">
            <span class="text-sm lg:text-base font-medium">
            {{priceConverted}}
            </span>
        </td>
        <td class="text-right">
            <span v-if="getWishedProduct.stock" class="text-sm lg:text-base font-medium">
            {{getWishedProduct.stock}} stock left
            </span>
            <span v-else class="text-sm lg:text-base font-medium">
            Stock is empty
            </span>
        </td>
        <td class="text-right">
            <button @click="goToCart" class="text-sm lg:text-base font-medium" @mouseover="showLogo" @mouseleave="showLogo">
            Buy This Product
            </button>
            <i v-if="goBuy" class="lni lni-cart-full ml-1 animate-bounce"></i>
        </td>
    </tr>
</template>

<script>
import axios from '../config/axios'

export default {
  name: 'WishlistCard',
  props: ['wish'],
  data () {
    return {
      goBuy: false
    }
  },
  methods: {
    showLogo () {
      this.goBuy = !this.goBuy
    },
    deleteThis () {
      this.$store.dispatch('deleteWish', this.wish.id)
    },
    goToCart () {
      if (localStorage.getItem('access_token')) {
        axios({
          method: 'post',
          url: `/cart/${this.getWishedProduct.id}`,
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
    getWishedProduct () {
      return this.$store.getters.getWishedProduct(this.wish.ProductId)
    },
    priceConverted () {
      return 'Rp. ' + this.getWishedProduct.price
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

</style>
