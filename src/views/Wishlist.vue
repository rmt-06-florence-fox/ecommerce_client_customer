<template>
  <div class="yourWishlist">
    <div class="container" style="min-height: 100vh">
      <div style="height: 5rem"/>
      <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="isLoading === true">
        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_1LhsaB.json"  background="transparent"  speed="1"  style="width: 400px; height: 400px;"  loop autoplay/>
      </div>
      <div v-else>
        <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="wishlists.length === 0">
          <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_exhdbjjp.json"  background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop autoplay/>
          <p class="subtitle is-2">Hmm... the wish box is empty! Do you have something to buy someday?</p>
        </div>
        <div v-else>
          <h3 class="title is-4 pt-5 ">Your Wishlist to get it at another time!</h3>
          <div class="columns">
            <div class="column is-8">
              <div class="columns is-flex is-flex-wrap-wrap">
                <wishlistCard v-for= "wishlist in wishlists" :key= "wishlist.id" :list= "wishlist"/>
              </div>
            </div>
            <div class="column is-flex is-justify-content-center">
              <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_zJkn1j.json"  background="transparent"  speed="1"  style="width: 450px; height: 450px;"  loop autoplay/>
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
import wishlistCard from '../components/wishlistCard'

export default {
  name: 'yourWishlist',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    wishlistCard
  },
  created () {
    this.isLoading = true
    this.$store.dispatch('fetchWishlists')
      .then(res => {
        this.$store.commit('FETCH_WISHLISTS', res.data)
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
      wishlists: 'wishlists'
    })
  }
}
</script>
