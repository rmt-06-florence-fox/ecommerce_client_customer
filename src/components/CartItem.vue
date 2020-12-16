<template>
<div class="container">
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters row mx-auto d-flex justify-content-center">
    <div class="col-md-4">
      <img :src="cart.Product.image_url" class="card-img mt-2 ml-2" alt="">
      <button type="submit" class="btn btn-danger btn-center mt-4" @click="removeCart(`${cart.id}`)">Remove Cart</button>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ cart.Product.name }}</h5>
        <p class="card-text">{{ cart.Product.price }}</p>
        <p class="card-text"><small class="text-muted">[total]: {{ cart.quantity }} x {{ cart.Product.price }} = {{ 'total_unit' }} </small></p>
        <div>
        <b-form-spinbutton id="demo-sb" v-model="quantity" min="0" :max="cart.Product.stock"></b-form-spinbutton>
      </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { BFormSpinbutton } from 'bootstrap-vue'
import { mapState } from 'vuex'

export default {
  name: 'CartItem',
  props: ['cart'],
  computed: {
    ...mapState([
      'carts'
    ])
    // total_unit: () => {
    //   return this.cart.quantity * this.cart.Product.price
    // }
    // ...mapActions([

    // ])
    // quantity () {
    //   return this.updateCart()
    // }
  },
  data () {
    return {
      quantity: ''
    }
  },
  methods: {
    updateCart () {
      const payload = {
        id: this.cart.Product.id,
        quantity: this.quantity
      }
      this.$store.dispatch('updateCart', payload)
    },
    removeCart (id) {
      this.$store.dispatch('deleteCart', id)
    }
  },
  components: {
    BFormSpinbutton
  },
  created () {
    this.quantity = this.cart.quantity
    this.updateCart()
  }
}
</script>

<style>

</style>
