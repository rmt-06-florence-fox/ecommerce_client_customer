<template>
  <div>
    <Navbar></Navbar>
    <!-- {{ totalPrice }}
    {{ carts }} -->
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-sm-12 mt-5">
          <div class="card">
            <div class="card-headers mt-3">
              <h3>Your Carts</h3>
            </div>
            <div class="card-body">
              <!-- Looping Product Card -->
              <Cart v-for="cart in carts" :key="cart.id" :cart="cart"></Cart>
            </div>
          </div>
        </div>
        <div class="col-md-5 col-sm-12 mt-5">
          <div class="card">
            <div class="card-headers mt-3 mb-1">
              <h3>Your Transaction</h3>
            </div>
            <div class="card-body">
              <table class="table">
                <tr>
                  <th>Total Transactions</th>
                  <td>Rp {{ convertRupiah }},00</td>
                </tr>
              </table>
            </div>
            <div class="card-footer">
              <button class="btn btn-checkout">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
export default {
  name: 'Carts',
  components: {
    Navbar,
    Cart
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCarts')
    }
  },
  computed: {
    carts () {
      return this.$store.getters.getCart
    },
    totalPrice () {
      return this.$store.getters.totalPrice[0].totalPrice
    },
    convertRupiah () {
      const numberString = this.totalPrice.toString()
      const sisa = numberString.length % 3
      var rupiah = numberString.substr(0, sisa)
      const ribuan = numberString.substr(sisa).match(/\d{3}/g)
      if (ribuan) {
        const separator = sisa ? '.' : ''
        rupiah += separator + ribuan.join('.')
      }
      return rupiah
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>
.img-cart{
  width: 100px;
}
.btn-checkout{
  background-color: #2fd4f5 !important;
  width: 130px;
}
</style>
