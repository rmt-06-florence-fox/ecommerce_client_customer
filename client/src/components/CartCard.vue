<template>
  <div class="col-3">
    <div class="card">
      <img :src="cart.Product.image_url" height="100" :alt="cart.Product.category" class="card-img-top">
      <div class="card-body">
        <h5 class="card-productid">Product: {{ cart.Product.name }}</h5>
      </div>
      <div class="card-body">
        <h5 class="card-productid">Price: {{ price }}</h5>
      </div>
      <div class="card-body">
        <h5 class="card-status">Status: {{ cart.status }}</h5>
      </div>
      <div class="card-body">
        <h5 class="card-quantity">Quantity: {{ cart.quantity }}</h5>
      </div>
      <div class="card-body">
        <button @click="reduceQuantity" type="button" class="btn btn-secondary m-3 mx-auto">Reduce</button>
        <button @click="addQuantity" type="button" class="btn btn-primary m-3 mx-auto">Add</button>
      </div>
    </div><br><br><br>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: {
    cart: Object
  },
  methods: {
    reduceQuantity () {
      this.$store.dispatch('reduceQuantity', this.cart)
    },
    addQuantity () {
      this.$store.dispatch('addQuantity', this.cart)
    }
  },
  computed: {
    price () {
      let result = ''
      const reversedprice = this.cart.Product.price.toString().split('').reverse().join('')
      for (let i = 0; i < reversedprice.length; i++) if (i % 3 === 0) result += reversedprice.substr(i, 3) + '.'
      return 'Rp. ' + result.split('', result.length - 1).reverse().join('')
    }
  }
}
</script>

<style>

</style>
