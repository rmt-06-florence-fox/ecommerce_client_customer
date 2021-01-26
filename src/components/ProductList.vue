<template>
  <div class="card bg-dark text-light" style="width: 19rem;">
  <img :src="product.image_url" class="product-image" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ product.name }}</h5>
    <h5 class="card-title">Rp {{ product.price }}</h5>
    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
    <!-- <button></button> -->
    <a href="#" class="btn btn-primary" @click.prevent="addCart">Add to Cart</a>
  </div>
</div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    addCart () {
      const payload = this.product.id
      this.$store.dispatch('addToCart', payload)
        .then(() => {
          this.$store.dispatch('fetchCart')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

}
</script>

<style>
.product-image {
  width: 302px;
  height: 200px;
}
</style>
