<template>
<section class="text-gray-700 body-font h-full">
  <div class="container px-5 py-24 mx-auto flex flex-col justify-center items-center">
    <div class="text-center mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Thank You For Your Purchase</h1>
      <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Below is your transaction details. To confirm your purchase please transfer payment to one of the payment channels below and confirm your transfer by uploading it to Confirmation Page</p>
    </div>
    <div class="flex flex-wrap -m-4 justify-around w-10/12">
        <div class="p-4">
            <!-- <p class="mb-6 italic">Total Cost are calculated based on values you have entered</p> -->
            <cardTotalDetail v-for="(item, idx) in totalPrice" :key="idx" :item="item" :idx="idx" />
            <div class="flex justify-between pt-4 border-b">
                <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                Total
                </div>
                <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                {{priceTotal}}
                </div>
            </div>
        </div>
        <div class="p-4 space-y-2">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4 border-b">Additonal Message</h1>
            <p class="max-w-xs"> {{postCheckout}} </p>
        </div>
        <div class="p-4 space-y-2">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4 border-b">Payment Options</h1>
            <div>
                <i class="lni lni-wallet"></i> Pay With Wallet Saldo
            </div>
            <div>
                <i class="lni lni-credit-cards"></i> Pay With Credit Card
                <i class="lni lni-visa"></i> <i class="lni lni-discover"></i> <i class="lni lni-mastercard"></i>
            </div>
            <div>
                <i class="lni lni-paypal"></i> Pay With Paypal
            </div>
            <div>
                <i class="lni lni-instagram"></i> Pay With Exposure
            </div>
        </div>
    </div>
    <button @click="goBack" class="flex mx-auto mt-16 text-white bg-black border-2 py-2 px-8 focus:outline-none hover:bg-white hover:text-black hover:border-black text-lg">Go Back To Home Page</button>
  </div>
</section>
</template>

<script>
import { mapState } from 'vuex'
import cardTotalDetail from '../components/cartTotalDetail'

export default {
  name: 'Thankyou',
  components: {
    cardTotalDetail
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState({
      carts: 'carts',
      totalPrice: 'totalPrice',
      postCheckout: 'postCheckout'
    }),
    priceTotal () {
      return 'Rp. ' + this.$store.getters.getTotal
        .toString()
        .split('')
        .reverse()
        .map((el, i) => i % 3 === 0 && i !== 0 ? `${el}.` : el)
        .reverse()
        .join('') + ',00'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Cart') {
      next()
    } else {
      next({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>
