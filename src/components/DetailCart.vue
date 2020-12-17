<template>
<tr>
    <th scope="row"> {{i+1}}</th>
    <td>{{cart.Product.name}}</td>
    <td><img :src="cart.Product.image_url" alt="gambar product" class="image-product"></td>
    <td>{{toLocalStringPrice(cart.Product.price)}} / item</td>
    <td>  <button class="btn btn-danger mr-2" @click.prevent="minus(cart.id)"> - </button>{{ quantity }} <button class="btn btn-primary mr-2" @click.prevent="plus(cart.id)"> + </button></td>
    <td>
        <button class="btn btn-danger" @click="goToDelete(cart.ProductId)">Delete</button>
    </td>
</tr>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'DetailCart',
  data () {
    return {
      quantity: this.cart.quantity
    }
  },
  props: ['cart', 'i'],
  methods: {
    toLocalStringPrice (price) {
      const newPrice = price.toLocaleString('EN-US', { style: 'currency', currency: 'USD' })
      return newPrice
    },
    goToDelete (id) {
    //   console.log(id)
      this.$store.dispatch('deleteItemOnCart', id)
    },
    minus (id) {
      console.log('minus')
      if (this.quantity <= 1) {
        this.quantity = 1
        Swal.fire({
          icon: 'error',
          title: 'Reducing an item was fail',
          text: 'Please input of minimum 1 item'
        })
      } else {
        this.quantity--
      }
      const payload = {
        id,
        quantity: this.quantity
      }
      this.$store.dispatch('updateQuantity', payload)
    },
    plus (id) {
      // console.log('<<<<<<<<<<<<<')
      if (this.quantity >= this.cart.Product.stock) {
        this.quantity = this.cart.Product.stock
        Swal.fire({
          icon: 'error',
          title: 'Out of stock!',
          text: 'We are so sorry of the limited stock'
        })
      }
      this.quantity++
      const payload = {
        id,
        quantity: this.quantity
      }
      this.$store.dispatch('updateQuantity', payload)
    }
  }
}
</script>

<style>
.image-product {
  width: 200px;
}

tr {
font-size: 18px;
}
</style>
