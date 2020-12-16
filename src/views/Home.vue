<template>
  <div class="home container">
    <center v-if="isLoading">
    <div style="margin-top: 100px;" class="container">
      <lottie-player src="https://assets4.lottiefiles.com/animated_stickers/lf_tgs_g7ve4rc8.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop  autoplay></lottie-player>
    </div>
    </center>
    <div class="row mx-auto d-flex justify-content-center" style="width:100%" v-else>
      <CardProduct v-for="product in listProduct" :key="product.id" :product="product"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardProduct from '../components/CardProduct.vue'
export default {
  name: 'Home',
  components: {
    CardProduct
  },
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    this.$store.dispatch('fetchProduct')
      .then(value => {
        this.$store.commit('set_product', value.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.isLoading = false
      })
  },
  computed: {
    listProduct () {
      return this.$store.state.products
    }
  }
}
</script>
<style>
</style>
