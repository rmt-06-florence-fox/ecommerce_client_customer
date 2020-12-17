<template>
  <div>
    <div class="card ml-5 mt-3 " style="width: 13rem;" id="card">
      <img :src="Product.imageUrl" class="card-img-top" style="width: 12.9rem; height: 14rem">
      <div class="card-body">
        <h5 class="card-title">{{ Product.name }}</h5>
        <p class="card-text">Rp {{ Product.price }}</p>
        <p class="card-text">stock: {{ Product.stock }}</p>
        <a @click="addToCart" class="btn btn-dark" id="btn-addCart">
          <img src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png" width="15" height="15" alt="">
          add to cart</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['Product'],
  methods: {
    addToCart () {
      const payload = {
        ProductId: this.Product.id
      }
      this.$store.dispatch('addCart', payload)
    }
  }
}
</script>

<style>
  #card {
    margin-bottom: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  #btn-addCart {
    width: 10rem;
    color: white;
    cursor: pointer;
    border-radius: 0px;
  }
  #btn-addCart:hover {
    color: black;
    background-color: white;
  }
</style>
