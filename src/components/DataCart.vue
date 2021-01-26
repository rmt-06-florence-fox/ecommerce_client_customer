<template>
    <tr>
      <td><img class="cart-image" :src="cart.Product.image_url" alt="image"></td>
      <td>{{ cart.Product.name }}</td>
      <td>Rp {{ cart.Product.price }}</td>
      <td>{{ cart.quantity }}</td>
      <td>
          <img width="42" height="42" src="../assets/minus.svg" @click.prevent="quantityMinus">
          <img width="42" height="42" src="../assets/plus.svg" @click.prevent="quantityPlus">
          <img width="42" height="42" src="../assets/dustbin.svg" @click.prevent="deleteCart">
      </td>
  </tr>
</template>

<script>
export default {
  props: ['cart'],
  methods: {
    quantityPlus () {
      this.$store.dispatch('incrementCart', this.cart.Product.id)
        .then(() => {
          this.$store.dispatch('fetchCart')
        })
        .catch(error => {
          console.log(error)
        })
    },

    quantityMinus () {
      this.$store.dispatch('decrementCart', this.cart.Product.id)
        .then(() => {
          this.$store.dispatch('fetchCart')
        })
        .catch(error => {
          console.log(error)
        })
    },

    deleteCart () {
      this.$store.dispatch('removeCart', this.cart.Product.id)
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
.cart-image {
  width: 235px;
  height: 150px;
}
</style>
