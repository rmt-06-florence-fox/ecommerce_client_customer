<template>
  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-5 mb-5">
      <div class="card" style="width: 18rem; background-color: #B8F0F0;">
        <img class="card-img-top image-box" :src="product.image_url" alt="Card image cap">
        <div class="card-body">
            <h5 class="text-card">{{product.name}}</h5>
            <h6>Rp. {{product.price}}</h6>
            <h6>Stock {{product.stock}}</h6>
            <button @click="addToCart(product.id)" class="btn" style="background-color: #68dede;">Add to Cart <i class="fa fa-shopping-cart"></i> </button>
        </div>
     </div>
    </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    addToCart (idProduct) {
      console.log(idProduct)
      this.$store.dispatch('addToCart', idProduct)
    }
  }
}
</script>

<style>
  .image-box {
      max-width: 286px;
      max-height: 180px;
      min-width: 286px;
      min-height: 180px;
  }
</style>
