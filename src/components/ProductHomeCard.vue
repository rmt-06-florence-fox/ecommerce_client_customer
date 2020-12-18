<template>
  <div class="card bg-light text-dark">
    <img class="card-img-top" :src="product.image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title"> {{product.name}} </h5>
      <p class="card-text">{{product.description}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{product.price}}</li>
      <li class="list-group-item">{{product.stock}}</li>
    </ul>
    <div class="card-body">
      <form @submit.prevent="addToCart(product.id)">
        <label for="qty"> Quantity: </label> <br>
        <input type="number" min="1" :max="product.stock" v-model="Qty"> <br>
        <button class="btn btn-dark"> Add To Cart </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCard',
  props: ['product'],
  data () {
    return {
      Qty: '1'
    }
  },
  methods: {
    addToCart (id) {
      const data = { id, Qty: this.Qty }
      this.$store.dispatch('addToCart', data)
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
        })
        .catch(({ err }) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

input {
  width: 25%;
  text-align: center;
}

</style>
