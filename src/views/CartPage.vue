<template>
  <div class="home">
    <div class="container-product row">
      <CartCard
        v-for="(product,index) in cartData"
        :key="index"
        :product="product"
      ></CartCard>
    </div>
  </div>
</template>

<script>

import CartCard from '../components/CartCard.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    CartCard
  },
  computed: {
    ...mapState({
      cartData: 'cartData'
    })
  },
  created () {
    this.$store.dispatch('fetchCart')
  }

}
</script>
