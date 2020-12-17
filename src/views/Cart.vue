<template>
<section class="boxSection">
        <div class="text-center my-5">
            <h1>My Cart</h1>
        </div>
        <div>
            <div class="my-5 mx-5 d-flex flex-column">
                <table
                class="table table-borderless align-self-center text-center"
                style="width: 80rem">
                    <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                      <Carts
                      v-for="(cart, i) in $store.state.carts"
                      :key="i" :cart="cart"></Carts>
                    </tbody>
                </table>
                <div class="text-center">
                  <h4 class="text-center"><b>Total Harga</b></h4>
                  <h3>{{formatTotal}}</h3>
                </div>
                <a @click="checkout"><button>Checkout</button></a>
            </div>
        </div>
    </section>
</template>

<script>
import Carts from '../components/CartsData.vue'

export default {
  name: 'Cart',
  components: {
    Carts
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    checkout () {
      this.$store.dispatch('dummyCheckout')
    }
  },
  computed: {
    total () {
      const { carts } = this.$store.state
      let totalPrice = 0
      carts.forEach((element) => {
        totalPrice += (element.quantity * element.Product.price)
      })
      return totalPrice
    },
    formatTotal () {
      return this.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style scope>

.boxSection {
    border: 1px rgb(214, 206, 206) solid;
    margin: 50px;
    border-radius: 20px;
}

</style>
