<template>
  <div class="row mx-auto d-flex justify-content-center" style="width:100%">
    <div class="card col-3 m-2 border-0 shadow" style="width: 18rem;">
      <img :src="product.image_url" class="card-img-top" alt="">
        <div class="card-body d-flex flex-column align-items-center">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.price }}</p>
      <p class="card-text">{{ product.stock }}</p>
    <a href="#" class="btn btn-secondary" @click="addToCart">Add to Cart</a>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product'],
  methods: {
    addToCart () {
      this.$store.dispatch('addToCart', this.product)
    }
  }
}
</script>
