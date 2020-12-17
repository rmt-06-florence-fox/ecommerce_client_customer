<template>
  <div class="col-3">
    <div class="card">
      <img :src="product.image_url" height="100" :alt="product.category" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">Name: {{ product.name }}</h5>
      </div>
      <div class="card-body">
        <h5 class="card-title">Price: {{ price }}</h5>
      </div>
      <div class="card-body">
        <h5 class="card-title">Stock: {{ product.stock }}</h5>
      </div>
      <div class="card-body">
        <h5 class="card-title">Model: {{ product.category }}</h5>
      </div>
      <button @click.prevent="addCart" v-if="loggedIn" class="btn btn-primary m-3 mx-auto">Add To Cart</button>
    </div><br><br><br>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  methods: {
    loginCheck () {
      if (localStorage.getItem('access_token')) this.$store.commit('loginCheck', true)
      else this.$store.commit('loginCheck', false)
    },
    addCart () {
      console.log(this.product.id)
      this.$store.dispatch('addCart', this.product)
    }
  },
  computed: {
    price () {
      let result = ''
      const reversedprice = this.product.price.toString().split('').reverse().join('')
      for (let i = 0; i < reversedprice.length; i++) if (i % 3 === 0) result += reversedprice.substr(i, 3) + '.'
      return 'Rp. ' + result.split('', result.length - 1).reverse().join('')
    },
    products () {
      return this.$store.state.products
    },
    loggedIn () {
      return this.$store.state.loggedIn
    }
  },
  created () {
    this.loginCheck()
  }
}
</script>

<style>

</style>
