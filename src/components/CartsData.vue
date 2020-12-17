<template>
    <tr>
        <td scope="row">
            <img width="150"
            :src="cart.Product.image_url"
            alt="image">
        </td>
        <td style="width: 20rem">{{cart.Product.name}}</td>
        <td style="width: 20rem">{{cart.Product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }}</td>
        <td>
          <button @click="minusQuantity" role="button" class="btn btn-danger minus">-</button>
          {{cart.quantity}}
          <button @click="plusQuantity" role="button" class="btn btn-danger plus">+</button>
          </td>
        <td>
            <a @click="deleteCart(cart.id)" role="button" class="btn btn-danger">Delete</a>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'CartsData',
  props: ['cart'],
  methods: {
    deleteCart (id) {
      console.log(id, 'ini id')
      this.$store.dispatch('deleteFromCart', id)
    },
    minusQuantity () {
      const payload = {
        id: this.cart.id,
        quantity: this.cart.quantity - 1
      }
      this.$store.dispatch('patchCart', payload)
    },
    plusQuantity () {
      const payload = {
        id: this.cart.id,
        quantity: this.cart.quantity + 1
      }
      this.$store.dispatch('patchCart', payload)
    },
    minimumOrder () {
      if (this.cart.quantity === 1) {
        return true
      }
    }
  }
}
</script>

<style>
</style>
