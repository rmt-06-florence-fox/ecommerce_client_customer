<template>
  <div class="col-4">
    <div class="card mt-5" style="width: 20rem;">
      <img :src="product.image_url" class="card-img-top" style="height: 30vh;">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Price : {{ product.price }}</p>
        <p class="card-text">Stock : {{ product.stock }}</p>
        <a href="#" class="btn btn-info">Add To Cart</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    createCart () {
      const token = localStorage.getItem('access_token')
      if (!token) {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style>

</style>
