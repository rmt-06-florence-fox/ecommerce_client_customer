<template>
  <div class="MainPage">
    <div class="container" style="min-height: 100vh">
      <div style="height: 4.5rem"/>
      <div class="container is-flex is-justify-content-center is-align-items-center" style="height: 90vh" v-if="isLoading === true">
        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_1LhsaB.json"  background="transparent"  speed="1"  style="width: 400px; height: 400px;"  loop autoplay/>
      </div>
      <div v-else>
        <h3 class="title is-3 pt-5 pl-5">List Products</h3>
        <div class="columns is-flex is-flex-wrap-wrap">
          <productCard v-for= "product in listProducts" :key= "product.id" :list= "product"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import productCard from '../components/productCard'

export default {
  name: 'MainPage',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    productCard
  },
  created () {
    this.isLoading = true
    this.$store.dispatch('fetchProduct')
      .then(res => {
        this.$store.commit('FETCH_PRODUCTS', res.data)
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
      listProducts: 'listProducts'
    })
  }
}
</script>
