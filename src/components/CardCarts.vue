<template>
  <div class="card product" style="width: 18rem;">
    <a style="align-text: center;" target="_blank" :href="product.image_url">
      <img class="card-img-top" :src="product.image_url" alt="https://www.kenangan.com/assets/img/no_image.jpg">
    </a>
    <div class="card-body">
      <h5 class="card-title"><strong>Category: {{ product.category }}</strong></h5>
      <p class="card-text">{{ product.name}}</p>
      <div class="d-flex justify-content-between">
          <p class="card-text"><small>Price: {{ product.price }}</small></p>
          <p class="card-text"><small v-if="product.stock == 0">Out of Stock</small></p>
          <p class="card-text"><small v-if="product.stock > 0">Stock: {{ product.stock }}</small></p>
        </div>
        <button @click="addToCart(product.id)" class="btn btn-primary">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
          </svg> Add To Cart
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CardCarts',
  props: [ 'product' ],
  methods: {
    fetchAllProducts () {
      this.$store.dispatch('fetchAllProducts')
    },

    addToCart (id) {
      const payload = {
        ProductId: id,
        quantity: 1
      }
      this.$store.dispatch('addToCart', payload)
        .then(() => {
          this.$router.push({ name: 'Cart' })
        })
    }
  }
}
</script>


<style>

</style>