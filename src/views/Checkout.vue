<template>
  <div class="YourCheckout">
    <div class="container" style="min-height: 100vh">
      <div style="height: 5rem"/>
      <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="isLoading === true">
        <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_CWcCII.json"  background="transparent"  speed="1"  style="width: 400px; height: 400px;"  loop autoplay/>
      </div>
      <div v-else>
        <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="listCheckout.length === 0">
          <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_x4zTKW.json"   background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop autoplay/>
          <p class="subtitle is-2">You're not doing any transaction here. Maybe you can check your cart there..</p>
        </div>
        <div v-else>
          <h3 class="title is-4 pt-5">This is your last checkout from your transaction</h3>
          <div class="columns">
            <div class="column">
              <div>
                <CheckoutCard
                v-for= "checkout in listCheckout" :key= "checkout.id"
                :list= "checkout"
                />
              </div>
            </div>
            <div class="column is-flex is-justify-content-center">
              <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_ltbqacam.json"  background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop autoplay/>
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
import CheckoutCard from '../components/checkoutCard'

export default {
  name: 'YourCheckout',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
  },
  components: {
    CheckoutCard
  },
  created () {
    this.isLoading = true
    this.$store.dispatch('fetchCheckout')
      .then(res => {
        this.$store.commit('FETCH_CHECKOUT', res.data)
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
      listCheckout: 'listCheckout'
    })
  }
}
</script>
