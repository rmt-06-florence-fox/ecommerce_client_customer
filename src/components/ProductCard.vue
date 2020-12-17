<template>
  <div class="col-md-3 mb-4">
    <div class="shadow rounded card">
      <div class="p-0">
        <img :src="product.image_url" class="card-img-top" :alt="product.name">
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">{{product.Category.name}}</p>
          <p class="card-text">Price: {{product.price}}</p>
          <p class="card-text">Stock: {{product.stock}}</p>
          <a href="#" class="btn btn-primary mr-1" @click.prevent="addCart(product.id)">Add to Cart</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addCart (id) {
      this.$store.dispatch('addCart', { id, bought: 1 })
        .then(response => {
          this.$alert('add cart successful', null, 'success')
          this.fetchProduct()
        })
        .catch(error => {
          this.$alert(error.response.data.message, null, 'error')
          this.$router.push('/login')
        })
    },
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    }
  }
}
</script>

<style>

</style>
