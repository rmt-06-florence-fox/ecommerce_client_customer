<template>
  <div>
    <div class="card h-100">
      <img :src="product.image_url" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">{{ product.name }}</h5>
      </div>
      <div class="card-footer price">
        <p class="card-text fas fa-calculator"> {{ product.stock }} left</p>
        <p class="card-text fas fa-money-bill ml-auto"> <small> Rp </small>{{ convertRupiah }},00</p>
      </div>
      <button @click.prevent="addCart" v-if="isLogin && product.stock !== 0" class="btn btn-add-cart m-2 mx-auto"><b-icon icon="bag-plus"></b-icon> Add To Cart</button>
      <button v-if="isLogin && product.stock === 0" class="btn m-2 mx-auto" disabled><b-icon icon="x-circle"></b-icon> Stock Not Enough</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    checkLogin () {
      if (localStorage.getItem('access_token')) this.$store.commit('checkLogin', true)
      else this.$store.commit('checkLogin', false)
    },
    addCart () {
      console.log(this.product.id)
      const payload = {
        productId: this.product.id,
        quantity: 1
      }
      this.$store.dispatch('addCart', payload)
    }
  },
  computed: {
    convertRupiah () {
      const numberString = this.product.price.toString()
      const sisa = numberString.length % 3
      var rupiah = numberString.substr(0, sisa)
      const ribuan = numberString.substr(sisa).match(/\d{3}/g)
      if (ribuan) {
        const separator = sisa ? '.' : ''
        rupiah += separator + ribuan.join('.')
      }
      return rupiah
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>

<style scoped>
  .price{
    color: #2aa6be;
    font-size: small;
    display: flex;
  }
  img {
    max-height: 200px;
    max-width: 250px;
  }
  .btn-add-cart{
    background-color: #80daec;
    width: 60%;
  }
</style>
