<template>
  <div class="container">
     <div class="loading" v-if="isLoading">
        <center>
          <lottie-player src="https://assets4.lottiefiles.com/animated_stickers/lf_tgs_g7ve4rc8.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop  autoplay></lottie-player>
        </center>
      </div>
      <div class="row" v-else>
          <div class="col-md-3">
              <!-- card checkout -->
            <div class="card">
              <div class="card-header">
                Checkout
              </div>
              <div class="card-body">
                <h5 class="card-title">Total Price On Your Cart</h5>
                <h6 class="card-text">{{ convertMoney() }}</h6>
                <p class="card-text">Checkout Now And Get Your Product</p>
                <p class="card-text">Wee will to your email for more about payment</p>
                <button href="#" class="btn btn-primary" disabled>Checkout Now</button>
              </div>
            </div>
              <!-- card checkout -->
          </div>
          <div class="col-9">
              <h1>Your Cart</h1>
              <div class="d-flex flex-column bd-highlight mb-3">
                  <div v-if="!carts || carts.length === 0">
                      <h1>Anda belum memiliki Cart</h1>
                  </div>
                  <div v-else>
                    <CardCart v-for="cart in carts" :key="cart.id" :cart="cart"/>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import CardCart from '../components/CardCart.vue'
export default {
  name: 'Cart',
  data () {
    return {
      isLoading: false,
      carts: this.$store.state.carts,
      total: this.$store.state.totalPrice
    }
  },
  components: {
    CardCart
  },
  methods: {
    convertMoney () {
      let thousand = this.total.toString().split('').reverse().join('')
      thousand = thousand.match(/\d{1,3}/g)
      thousand = thousand.join('.').split('').reverse().join('')
      return `Rp.${thousand},-`
    }
  },
  created () {
    this.isLoading = true
    if (!localStorage.getItem('access_token')) {
      this.carts = null
      this.isLoading = false
    } else {
      this.$store.dispatch('fetchCart')
        .then(value => {
          this.$store.commit('set_carts', value.data)
          this.carts = value.data
          const carts = value.data
          let total = 0
          for (let i = 0; i < carts.length; i++) {
            const price = carts[i].quantity * carts[i].Product.price
            total += price
          }
          this.total = total
          console.log(value.data)
          this.$store.dispatch('getTotalPrice')
        })
        .catch(err => {
          console.log('masuk error')
          console.log(err, '<<<<<<<<<<<')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style>

</style>
