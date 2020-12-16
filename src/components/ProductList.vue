<template>
  <div class="container-fluid pt-5 mt-5 d-flex row">
    <div class="mt-3 ml-3 col" v-for="(product, i) in getProduct" :key="i">
      <div class="card fit shadow">
        <div class="card-header">
          <img class="temp-img" :src="product.image_url" alt="">
          <div class="temp-img-overlay">
            <button class="btn btn-add btn-sm" @click.prevent="addToCart(product.id)">Add To Cart</button>
          </div>
        </div>
        <div class="card-body row mt-3">
          <div class="col p-0">
            <p><b>Price</b></p>
            <p class="mt-1">Rp. {{ product.price }},00</p>
          </div>
          <div class="col p-0">
            <p><b>Name</b></p>
            <p class="mt-1">{{ product.name }}</p>
          </div>
          <div class="col-3 p-0">
            <p><b>Stock</b></p>
            <p class="mt-1">{{ product.stock }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    },
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    }
  },
  computed: {
    getProduct () {
      return this.$store.state.products
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
  .btn-add {
    background-color: aquamarine;
  }
  .temp-img {
    width: 350px;
    height: 250px;
    display: block;
  }
  .temp-img-overlay {
    position: absolute;
    top: -20%;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .temp-img-overlay:hover {
    opacity: 1;
  }
  .fit {
    position: relative;
    width: 400px;
    height: 450px;
  }
  .img-container {
    width: 200px;
    height: 250px;
  }
  .desc-container {
    width: 400px;
    height: 200px
  }
  .desc {
    width: 400px;
    height: 130px;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .center {
    margin-left: auto;
    margin-right: auto;
  }
  .card {
    min-height: 300px;
  }
  .card-body {
    padding: 0;
  }
  .table-name {
    width: 250px;
    height: 30px;
  }
  .table-price {
    width: 80px;
    height: 30px;
  }
  .table-stock {
    width: 50px;
    height: 30px;
  }
</style>
