<template>
<div class="container">
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters row mx-auto d-flex justify-content-center">
    <div class="col-md-4">
      <img :src="cart.Product.image_url" class="card-img" alt="">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ cart.Product.name }}</h5>
        <p class="card-text">{{ cart.Product.price }}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        <div>
        <b-form-spinbutton id="demo-sb" v-model="value" min="1" max="100"></b-form-spinbutton>
      </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { BFormSpinbutton } from 'bootstrap-vue'

export default {
  name: 'CartItem',
  props: ['cart', 'total'],
  data () {
    return {
      value: 1
    }
  },
  components: {
    BFormSpinbutton
  }
}
</script>

<style>

</style>
