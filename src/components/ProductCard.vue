<template>
  <div class="card m-3 col-3" style="width: 18rem;">
    <img :src="product.image_url" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">{{product.name}}</h5>
      <p class="card-text">{{product.price}}</p>
      <p class="card-text">{{product.stock}}</p>
      <div>
        <a @click.prevent="addToCart(product.id)" class="btn btn-primary text-white m-1" style="cursor: pointer">Add To Cart</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    }
  }
}
</script>

<style>

</style>
