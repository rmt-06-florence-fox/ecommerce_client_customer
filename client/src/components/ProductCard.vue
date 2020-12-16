<template>
    <div class="col-3">
        <div class="card">
            <img :src="product.image_url" height="100" :alt="product.category" class="card-img-top">
            <div class="card-body">
               <h5 class="card-title">Name: {{ product.name }}</h5>
            </div>
            <div class="card-body">
               <h5 class="card-title">Price: {{ product.price }}</h5>
            </div>
            <div class="card-body">
               <h5 class="card-title">Stock: {{ product.stock }}</h5>
            </div>
            <div class="card-body">
               <h5 class="card-title">Model: {{ product.category }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Product',
  props: {
    product: Object
  },
  methods: {
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
