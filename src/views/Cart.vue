<template>
  <div class="YourCart">
    <div class="container" style="min-height: 100vh">
      <div style="height: 5rem"/>
      <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="isLoading === true">
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_CWcCII.json"  background="transparent"  speed="1"  style="width: 400px; height: 400px;"  loop autoplay/>
      </div>
      <div v-else>
        <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="listCarts.length === 0">
          <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_CWcCII.json"  background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop autoplay/>
          <p class="subtitle is-2">This Page is still empty. Go find something to buy!</p>
        </div>
        <div v-else>
          <h3 class="title is-4 pt-5">Your Carts, please check before you get it!</h3>
          <div class="columns">
            <div class="column">
              <div>
                <CartCard
                v-for= "Cart in listCarts" :key= "Cart.id"
                :list= "Cart"
                />
              </div>
            </div>
            <div class="column">
              <h3 class="subtitle is-4">Your total price is</h3>
              <h2 class="title is-4">{{priceRp}}</h2>
              <a class="button is-white" @click.prevent="checkout(totalCheckout)">
                Confirm for checkout
              </a>
            </div>
            <div class="column is-flex is-justify-content-center">
              <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_pHl01w.json"  background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop autoplay/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import CartCard from '../components/cartCard'

export default {
  name: 'YourCart',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    checkout (totalCheckout) {
      this.$swal.fire({
        title: 'Do you wanna to checkout?',
        text: 'Please check again before you buy',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.isLoading = true
            return this.$store.dispatch('checkout', totalCheckout)
          }
        })
        .then(res => {
          return this.$store.dispatch('fetchCart')
        })
        .then(res => {
          this.$store.commit('FETCH_CARTS', res.data[0])
          this.$store.commit('FETCH_TOTAL_CHECKOUT', res.data[1])
          this.$swal.fire({
            title: 'Success!',
            text: 'Thank you for buy product, now you can check your checkout on your transaction',
            icon: 'success'
          })
        })
        .catch(err => {
          this.$swal.fire({
            icon: 'error',
            title: `${err.response.status} ${err.response.statusText}`,
            text: `${err.response.data.message}`,
            timer: 5000
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  components: {
    CartCard
  },
  created () {
    this.isLoading = true
    this.$store.dispatch('fetchCart')
      .then(res => {
        this.$store.commit('FETCH_CARTS', res.data[0])
        this.$store.commit('FETCH_TOTAL_CHECKOUT', res.data[1])
      })
      .catch(err => {
        this.$swal.fire({
          icon: 'error',
          title: `${err.response.status} ${err.response.statusText}`,
          text: `${err.response.data.message}`,
          timer: 5000
        })
      })
      .finally(() => {
        this.isLoading = false
      })
  },
  computed: {
    ...mapState({
      listCarts: 'listCarts',
      totalCheckout: 'totalCheckout'
    }),
    priceRp: function () {
      let rupiah = ''
      const priceReverse = this.totalCheckout.toString().split('').reverse().join('')
      for (let i = 0; i < priceReverse.length; i++) if (i % 3 === 0) rupiah += priceReverse.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>
