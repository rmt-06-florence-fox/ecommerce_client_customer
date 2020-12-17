<template>
  <div class="card m-2" style="width: 18rem;">
    <img class="card-img-top" :src="product.image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{product.name}}</h5>
      <p class="card-text">{{ product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</p>
      <div class="stock">
        <p class="card-text m-2" v-if="product.stock > 0" >Stock: {{product.stock}}</p>
        <p class="card-text m-2" v-if="product.stock == 0" >Stock Not Available</p>
      </div>
      <div class="action-button">
        <button class="btn-danger" @click="addToCart(product.id)" v-if="loginStatus">Add to cart</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'product',
  props: ['product'],
  data () {
    return {
      loginStatus: localStorage.access_token
    }
  },
  components: {
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    }
  }
}
</script>

<style>

</style>
