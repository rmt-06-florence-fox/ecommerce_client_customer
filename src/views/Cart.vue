<template>
  <div class="YourCart">
    <div class="container" style="min-height: 100vh">
      <div style="height: 4.5rem"/>
      <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="isLoading === true">
        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_1LhsaB.json"  background="transparent"  speed="1"  style="width: 400px; height: 400px;"  loop autoplay/>
      </div>
      <div v-else>
        <h3 class="title is-3 pt-5 pl-5">Your Carts</h3>
        <div class="columns">
          <!-- uu -->
          <div class="column is-half">
            <div>
              <CartCard
              v-for= "Cart in listCarts" :key= "Cart.id"
              :list= "Cart"
              />
            </div>
          </div>
          <div class="column">
            <h3 class="subtitle is-3">Your total price is</h3>
            <h2 class="title is-2">{{priceRp}}</h2>
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
        console.log(err)
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
