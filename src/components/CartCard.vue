<template>
    <tr>
        <!-- {{cart}} -->
        <td class="hidden pb-4 md:table-cell">
            <a href="#">
            <img :src="cart.Product.image_url" class="w-20 rounded" alt="Thumbnail">
            </a>
        </td>
        <td>
            <a href="#">
            <p class="mb-2 md:ml-4">{{cart.Product.name}}</p>
                <button type="button" class="text-gray-700 md:ml-4" @click="deleteThis">
                <small>(Remove item)</small>
                </button>
            </a>
        </td>
        <td class="justify-center md:justify-end md:flex mt-6">
            <div class="w-20 h-10">
            <div class="relative flex flex-row w-full h-8">
            <input type="number" v-model="amountToShow"
                class="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
            </div>
            </div>
        </td>
        <td class="hidden text-right md:table-cell">
            <span class="text-sm lg:text-base font-medium">
            {{priceConverted}}
            </span>
        </td>
        <td class="text-right">
            <span class="text-sm lg:text-base font-medium">
            {{totalPrice}}
            </span>
        </td>
    </tr>
</template>

<script>
import axios from '../config/axios'

export default {
  name: 'CartCard',
  props: ['cart', 'idx'],
  data () {
    return {
      amountToShow: ''
    }
  },
  methods: {
    deleteThis () {
      axios({
        method: 'delete',
        url: `/cart/${this.cart.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
        //   console.log(res)
          this.$store.dispatch('loadCarts')
          // this.$store.commit('resetTotalPrice', [])
          //   console.log(this.idx)
          this.$store.commit('deleteTotalPrice', this.idx)
        })
    }
  },
  created () {
    this.amountToShow = this.cart.amount
  },
  computed: {
    priceConverted () {
      return 'Rp. ' + this.cart.Product.price
        .toString()
        .split('')
        .reverse()
        .map((el, i) => i % 3 === 0 && i !== 0 ? `${el}.` : el)
        .reverse()
        .join('') + ',00'
    },
    totalPrice () {
      return 'Rp. ' + (+this.cart.Product.price * +this.amountToShow)
        .toString()
        .split('')
        .reverse()
        .map((el, i) => i % 3 === 0 && i !== 0 ? `${el}.` : el)
        .reverse()
        .join('') + ',00'
    }
  },
  watch: {
    totalPrice: function () {
      this.$store.commit('setTotalPrice', { cart: this.cart, total: (+this.cart.Product.price * +this.amountToShow), amount: +this.amountToShow })
    },
    amountToShow: function (newVal, oldVal) {
      // console.log(newVal)
      if (+newVal === 0) {
        this.deleteThis()
        // console.log('sudah nol!!!')
      }
    },
    cart: function () {

    }
  }
}
</script>

<style>

</style>
