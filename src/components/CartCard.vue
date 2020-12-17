<template>
  <tr>
    <td>
      <img style="height: 20rem" :src="cart.Product.image_url" :alt="cart.Product.image_url">
    </td>
    <td class="centering">{{cart.Product.name}}</td>
    <td class="centering">{{cart.Product.stock}}</td>
    <td class="centering">Rp. {{setLable(cart.Product.price)}}</td>
    <td class="centering">
      <button
        type="button"
        class="btn btn-light btn-sm"
        @click="substractValue"
      >-</button>
      <input type="text" v-model="value" @change="changeValue" style="width:6rem">
      <button
        type="button"
        class="btn btn-light btn-sm"
        @click="addValue"
      >+</button>
    </td>
    <td class="centering">Rp. {{price}}</td>
    <td class="centering">
      <button
        type="button"
        class="btn btn-outline-danger"
        @click="removeCart(cart.id)">Remove from your cart</button>
    </td>
  </tr>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CartCard',
  props: ['cart'],
  data () {
    return {
      value: this.cart.amount
    }
  },
  computed: {
    price () {
      return this.setLable(this.cart.Product.price * this.value)
    }
  },
  methods: {
    setLable (price) {
      const harga = '' + price
      const label = harga.split('')
      let count = 0
      for (let i = label.length; i >= 0; i--) {
        if (i === label.length) {
          count++
          continue
        }
        if (count % 3 === 0) {
          label.splice(i, 0, '.')
        }
        count++
      }
      if (label[0] === '.') {
        label.shift()
      }
      return (label.join('') + ',00')
    },
    changeValue () {
      console.log(this.value)
      const payload = {
        id: this.cart.id,
        amount: this.value
      }
      this.$store.dispatch('editCart', payload)
        .then((response) => {
          this.$store.dispatch('fetchCart')
          this.$store.dispatch('countTotalPrice')
        })
        .catch((error) => {
          this.value = this.cart.amount
          console.log(error.response.data.message)
        })
    },
    addValue () {
      const payload = {
        id: this.cart.id,
        amount: this.value + 1
      }
      this.$store.dispatch('editCart', payload)
        .then((response) => {
          this.value++
          this.$store.dispatch('fetchCart')
          this.$store.dispatch('countTotalPrice')
        })
        .catch((error) => {
          console.log(error.response.data.message)
        })
    },
    substractValue () {
      const payload = {
        id: this.cart.id,
        amount: this.value - 1
      }
      this.$store.dispatch('editCart', payload)
        .then((response) => {
          this.value--
          this.$store.dispatch('fetchCart')
          this.$store.dispatch('countTotalPrice')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeCart (id) {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure want tu remove this from your cart?',
        showCancelButton: true,
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'red'
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('removeCart', id)
              .then((response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'success!',
                  text: 'Removed from your cart'
                })
                this.$store.dispatch('fetchCart')
                this.$store.dispatch('countTotalPrice')
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
    }
  }
}
</script>

<style>
.centering {
  text-align: center;
  vertical-align: middle;
}
</style>
