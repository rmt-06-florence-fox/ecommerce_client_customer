<template>
  <!-- <div class="container mt-2">
    <div class="row">
      <div class="col mb-3"
        v-for="cart in carts"
        :key="cart.id"
        >
        <CartCard :cart="cart"></CartCard>
      </div>
    </div>
  </div> -->
  <div class="container">
    <button type="button" class="btn btn-dark btn-block mt-2 mb-2" @click="checkout">Checkout</button>
    <div class="table-wrapper-scroll-y my-custom-scrollbar-cart">
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Product Name</th>
            <th scope="col">Stock Available</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Amount</th>
            <th scope="col">Total Price</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <CartCard
          v-for="cart in carts"
          :key="cart.id"
          :cart="cart">
          </CartCard>
        </tbody>
      </table>
    </div>
    <table class="table table-hover table-dark">
      <thead>
          <tr>
            <th scope="col">Grand Total</th>
            <th scope="col">Rp. {{setLable(grandTotal)}}</th>
          </tr>
        </thead>
    </table>
  </div>
</template>

<script>
import CartCard from '../components/CartCard'
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  components: {
    CartCard
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
    checkout () {
      Swal.fire({
        icon: 'warning',
        title: 'Are you sure want to check this out?',
        showCancelButton: true,
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'red'
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('checkout')
              .then((response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'success!',
                  text: 'Thanks for trusting us!'
                })
                this.$store.dispatch('fetchCart')
                this.$store.dispatch('countTotalPrice')
              })
              .catch((err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Hmmmm!',
                  text: 'Maybe some of them is out of stock!'
                })
                console.log(err)
              })
          }
        })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    grandTotal () {
      return this.$store.state.grandTotal
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
    if (!localStorage.getItem('access_token')) {
      this.$router.push('/sign')
    }
  }
}
</script>

<style>
.my-custom-scrollbar-cart {
position: relative;
height: 75vh;
overflow: auto;
}
.table-wrapper-scroll-y {
display: block;
}
</style>
