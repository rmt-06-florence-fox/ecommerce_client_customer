<template>
  <div class="card" style="width: 18rem;">
    <img :src="item.Product.image" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">{{ item.Product.name }}</h5>
        <div>
            <p class="card-text">{{ item.Product.description }}</p>
            <a @click.prevent="increment"><i class="fa fa-plus" style="cursor:pointer;"></i></a>
            <p class="card-text ml-3 mr-3" style="display:inline;">{{ quantity }}</p>
            <a @click.prevent="decrement"><i class="fa fa-minus" style="cursor:pointer;"></i></a>
        </div>
        <button @click="updateAmount" class="btn btn-primary mt-3"> update amount </button>
        <button @click="deleteCart" class="btn btn-danger mt-3 ml-2"> delete item </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['item'],
  data () {
    return {
      quantity: this.item.quantity
    }
  },
  methods: {
    increment () {
      this.quantity++
      if (this.quantity >= this.item.Product.stock) {
        this.quantity = this.item.Product.stock
      }
    },
    decrement () {
      this.quantity--
      if (this.quantity < 1) {
        this.quantity = 1
      }
    },
    updateAmount () {
      const payload = {
        quantity: this.quantity,
        ProductId: this.item.Product.id,
        status: true
      }
      this.$store.dispatch('addToCart', payload)
    },
    deleteCart () {
      //   console.log(this.item.id)
      this.$store.dispatch('deleteCart', this.item.id)
    }
  }
}
</script>

<style>

</style>
