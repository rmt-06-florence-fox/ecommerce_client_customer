<template>
  <b-card
    :img-src="product.imageUrl"
    img-width="298px"
    img-height="305"
    img-left
    style="width:90%"
  >
    <b-card-body>
      <div class="row justify-content-end">
        <b-icon icon="trash" variant="danger" class="" font-scale="2" @click="deleteCart"></b-icon>
      </div>
      <h2 class="mb-0">{{product.name}}</h2>
      <b-card-text class="mb-3 h5">{{formattingPrice()}} / piece</b-card-text>
      <b-card-text> Stock available : {{product.stock}} </b-card-text>
      <div class="d-flex justify-content-start">
        <b-button @click="decrement">-</b-button>
        <b-form>
          <b-form-input
            type="number"
            v-model="quantity"
            style="width: 70px"
          ></b-form-input>
        </b-form>
        <b-button @click="increment">+</b-button>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'CartCard',
  data () {
    return {
      quantity: 0,
      product: {}
    }
  },
  methods: {
    increment () {
      if (this.quantity < this.product.stock) {
        this.quantity++
      }
    },
    decrement () {
      if (this.quantity > 0) {
        this.quantity--
      }
    },
    formattingPrice () {
      const string = this.product.price + ''
      let array = string.split('').reverse()
      let counter = 0
      array = array.map(el => {
        if (counter % 3 === 0 && counter !== 0) el = el + '.'
        counter++
        return el
      })
      return 'Rp. ' + array.reverse().join('')
    },
    deleteCart () {
      this.$store.dispatch('deleteCart', this.cart.id)
    },
    getProduct () {
      this.product = this.cart.Product
    },
    getQuantity () {
      this.quantity = this.cart.quantity
    }
  },
  created () {
    this.getProduct()
    this.getQuantity()
  },
  watch: {
    quantity () {
      if (this.quantity < 0) {
        this.$store.commit('setErrors', ['The number of pieces cannot be less than negative'])
      } else if (this.quantity > this.product.stock) {
        this.$store.commit('setErrors', ['The number of pieces is more than available stock'])
        this.quantity = this.product.stock
      } else {
        const quantity = this.quantity
        const id = this.cart.id
        this.$store.dispatch('alterQuantity', { quantity, id })
      }
    }
  },
  props: ['cart']
}
</script>

<style>

</style>
