<template>
  <div class="card bg-light text-dark">
    <img class="card-img-top" :src="product.Product.image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title"> {{product.Product.name}} </h5>
      <p class="card-text">{{product.Product.description}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{product.Product.price}}</li>
      <li class="list-group-item">{{product.Product.stock}}</li>
    </ul>
    <div class="card-body">
      <form @submit.prevent="saveQty(product.ProductId)">
        <label for="qty"> Quantity: </label> <br>
        <input  type="number" v-model="Qty" min="1" :max="product.Product.stock"> <br> <br>
        <button type="submit" class="btn btn-dark"> Save </button> <button class="btn btn-dark" @click="deleted(product.ProductId)"> Delete </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['product'],
  data () {
    return {
      Qty: this.product.Qty
    }
  },
  methods: {
    deleted (id) {
      this.$store.dispatch('deleteFromCart', id)
        .then(({ data }) => {
          this.$store.dispatch('fetchCart')
        })
        .catch(({ err }) => {
          console.log(err)
        })
    },
    saveQty (id) {
      const payload = {
        id: id,
        Qty: this.Qty
      }
      this.$store.dispatch('updateQty', payload)
        .then(({ data }) => {
          this.$store.dispatch('fetchCart')
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
