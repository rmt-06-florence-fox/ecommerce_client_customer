<template>
  <tr>
    <td class="text-left" style="width: 55%">
      <img :src="item.Product.image_url" alt="" class="img-thumbnail mr-3" style="width: 25%">
      {{ item.Product.name }}
    </td>
    <td>
      <div>
        <button class="btn" @click="minusQuantity(item.id)">-</button>
        {{ item.quantity }}
        <button class="btn" @click="addQuantity(item.id)">+</button>
      </div>
    </td>
    <td>{{ priceFormat }}</td>
    <td>{{ totalPrice }}</td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'OrderData',
  props: ['item'],
  methods: {
    minusQuantity (id) {
      const payload = {
        orderId: id,
        quantity: -1
      }
      if (this.item.quantity === 1) {
        Swal.fire({
          title: 'Delete Confirmation',
          text: 'Are you sure want to delete this product?',
          icon: 'warning',
          confirmButtonText: 'Yes I\'m sure',
          showDenyButton: true,
          denyButtonText: 'No, cancel it'
        })
          .then(result => {
            if (result.value) {
              this.$store.dispatch('deleteOrder', id)
            }
          })
      } else {
        this.$store.dispatch('updateQuantity', payload)
      }
    },

    addQuantity (id) {
      const payload = {
        orderId: id,
        quantity: 1
      }
      if (this.item.quantity < this.item.Product.stock) {
        this.$store.dispatch('updateQuantity', payload)
      } else {
        Swal.fire({
          title: 'Max Stock Reached',
          text: 'Sorry, cannot update past the stock item!',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
      }
    }
  },
  computed: {
    priceFormat: function () {
      return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(this.item.Product.price)
    },
    totalPrice: function () {
      const totalPrice = this.item.Product.price * this.item.quantity
      return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(totalPrice)
    }
  }
}

</script>

<style>

</style>
