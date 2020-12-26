<template>
<!-- component -->
<div class="flex justify-center my-6">
  <ErrorCard v-if="addCartErr" />
  <div class="flex flex-col w-full p-8 text-gray-800 bg-white pin-r pin-y md:w-4/5 lg:w-4/5">
    <div class="flex-1">
      <table class="w-full text-sm lg:text-base" cellspacing="0">
        <thead>
          <tr class="h-12 uppercase">
            <th class="hidden md:table-cell"></th>
            <th class="text-left">Product</th>
            <th class="lg:text-right text-left pl-5 lg:pl-0">
              <span class="lg:hidden" title="Quantity">Qtd</span>
              <span class="hidden lg:inline">Quantity</span>
            </th>
            <th class="hidden text-right md:table-cell">Unit price</th>
            <th class="text-right">Total price</th>
          </tr>
        </thead>
        <tbody>
          <CartCard v-for="(cart, idx) in carts" :key="cart.id" :cart="cart" :idx="idx" />
        </tbody>
      </table>
      <hr class="pb-6 mt-6">
      <div class="my-4 mt-6 -mx-2 lg:flex">
        <div class="lg:px-2 lg:w-1/2">
          <div class="p-4 bg-gray-100 rounded-full">
            <h1 class="ml-2 font-bold uppercase">Special Notes</h1>
          </div>
          <div class="p-4">
            <p class="mb-4 italic">If you have some additional information for this purchase, you can leave them in the box below</p>
            <textarea v-model="additionalMessage" class="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
          </div>
        </div>
        <div class="lg:px-2 lg:w-1/2">
          <div class="p-4 bg-gray-100 rounded-full">
            <h1 class="ml-2 font-bold uppercase">Order Details</h1>
          </div>
          <div class="p-4">
            <p class="mb-6 italic">Total Cost are calculated based on the values you have entered</p>
                <cardTotalDetail v-for="(item, idx) in totalPrice" :key="idx" :item="item" :idx="idx" />
                <div class="flex justify-between pt-4 border-b">
                  <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                    Total
                  </div>
                  <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                    {{priceTotal}}
                  </div>
                </div>
                <button @click="checkout" class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-black shadow item-center hover:bg-white hover:text-black border-2 border-transparent hover:border-black focus:shadow-outline focus:outline-none">
                  <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"/></svg>
                  <span class="ml-2 mt-5px">Procceed to checkout</span>
                </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CartCard from '../components/CartCard'
import cardTotalDetail from '../components/cartTotalDetail'
import ErrorCard from '../components/ErrorCard'
import axios from '../config/axios'

export default {
  name: 'Cart',
  data () {
    return {
      additionalMessage: ''
    }
  },
  components: {
    CartCard,
    cardTotalDetail,
    ErrorCard
  },
  methods: {
    checkout () {
      // console.log(this.totalPrice)
      axios({
        method: 'post',
        url: '/cart/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          checkout: this.totalPrice
        }
      })
        .then(res => {
          this.$store.commit('setpostCheckout', this.additionalMessage)
          // this.$router.push('/thankyou')
        })
        .catch(error => {
          this.$store.commit('setAddCartErr', error.response.data.message)
          setTimeout(() => {
            this.$store.commit('setAddCartErr', null)
          }, 3000)
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
  },
  computed: {
    ...mapState({
      carts: 'carts',
      totalPrice: 'totalPrice',
      addCartErr: 'addCartErr'
    }),
    ...mapGetters({
      getTotal: 'getTotal'
    }),
    priceTotal () {
      return 'Rp. ' + this.getTotal
        .toString()
        .split('')
        .reverse()
        .map((el, i) => i % 3 === 0 && i !== 0 ? `${el}.` : el)
        .reverse()
        .join('') + ',00'
    }
  },
  created () {
    this.$store.commit('setCart', [])
    this.$store.dispatch('loadCarts')
    this.$store.commit('resetTotalPrice', [])
  },
  beforeRouteLeave (to, from, next) {
    console.log('moving')
    // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    // if (answer) {
    next()
    // } else {
    //   next(false)
    // }
  }
}
</script>

<style>

</style>
