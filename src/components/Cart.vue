<template>
  <div>
    <div class="card mb-1">
      <div class="row">
        <div class="col-3">
          <img :src="cart.Product.image_url" alt="" class="img-cart m-2">
        </div>
        <div class="col-7 mt-2 ">
          <h6>{{ cart.Product.name }} </h6>
          <button @click.prevent="decreaseQuantity" class="btn far fa-minus-square"></button>
          {{ cart.quantity }}
          <button @click.prevent="increaseQuantity" class="btn far fa-plus-square "></button>
          Rp. {{ totalPrice }}, 00
          <div class="card-footer">
            <small>remaining stock : {{ cart.Product.stock }} </small>
          </div>
        </div>
        <div class="col-2 mt-4">
          <button @click.prevent="deleteCart" class="btn fas fa-trash-alt fa-10x"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['cart'],
  methods: {
    decreaseQuantity () {
      const payload = {
        productId: this.cart.ProductId,
        quantity: -1
      }
      this.$store.dispatch('addCart', payload)
    },
    increaseQuantity () {
      const payload = {
        productId: this.cart.ProductId,
        quantity: 1
      }
      this.$store.dispatch('addCart', payload)
    },
    deleteCart () {
      this.$store.dispatch('deleteCart', this.cart.id)
    }
  },
  computed: {
    totalPrice () {
      const total = this.cart.quantity * this.cart.Product.price
      const numberString = total.toString()
      const sisa = numberString.length % 3
      var rupiah = numberString.substr(0, sisa)
      const ribuan = numberString.substr(sisa).match(/\d{3}/g)
      if (ribuan) {
        const separator = sisa ? '.' : ''
        rupiah += separator + ribuan.join('.')
      }
      return rupiah
    }
  }
}
</script>

<style>

</style>
