<template>
  <div class="col-md-3">
    <div class="shadow rounded card">
      <div class="p-0">
        <img :src="cart.Product.image_url" class="card-img-top" :alt="cart.Product.name">
        <div class="card-body">
          <h5 class="card-title">{{cart.Product.name}}</h5>
          <p class="card-text">Harga: {{cart.total_invoice}}</p>
          <div class="order-qty">
            <span class="material-icons up-down mr-1" @click.prevent="substract">arrow_circle_down</span>
            <p class="card-text">Order Qty: {{cart.bought}}</p>
            <span class="material-icons up-down ml-1" @click.prevent="add">arrow_circle_up</span>
          </div>
          <p class="card-text">Stock: {{cart.Product.stock}}</p>
          <button class="btn btn-danger" @click.prevent="removeCart">Remove cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart'],
  methods: {
    substract () {
      this.$store.dispatch('addCart', { id: this.cart.ProductId, bought: -1 })
        .then(response => {
          this.$store.dispatch('fetchCart')
        })
        .catch(error => {
          this.$alert(error.response.data.message, null, 'error')
        })
    },
    add () {
      this.$store.dispatch('addCart', { id: this.cart.ProductId, bought: 1 })
        .then(response => {
          this.$store.dispatch('fetchCart')
        })
        .catch(error => {
          this.$alert(error.response.data.message, null, 'error')
        })
    },
    removeCart () {
      this.$store.dispatch('removeCart', this.cart.id)
        .then(response => {
          this.$alert('remove cart successful', null, 'success')
          this.$store.dispatch('fetchCart')
        })
        .catch(error => {
          this.$alert(error.response.data.message, null, 'error')
        })
    }
  }
}
</script>

<style>

</style>
