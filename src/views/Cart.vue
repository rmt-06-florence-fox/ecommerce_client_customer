<template>
  <div>
    <v-container fluid>
      <p class="display-3 font-weight-light text-center pa-4">
        SHOPPING CART
      </p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-simple-table style="background-color: lightgray" class="pa-12" v-if="carts.length == 0">
            <tbody>
              <h2 class="display-1"><b>Your cart is still empty</b></h2>
              <p class="headline">Add items to cart and make it yours!</p>
            </tbody>
          </v-simple-table>
          <v-simple-table v-if="carts.length > 0">
            <thead>
              <tr>
                <th class="text-center">ITEM</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody v-for="item in carts" :key="item.id">
              <CartRow :item="item">
              </CartRow>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-card class="pa-4" md="3" sm="12" elevation="5">
          <v-card-title>
            <p class="headline align-text-center"><b>Order Summary</b></p>
          </v-card-title>
          <v-form>
            <v-text-field
              label="Name"
              placeholder="Enter your name"
              outlined
              v-model="name"
            >
            </v-text-field>
            <v-textarea
              outlined
              label="Address"
              placeholder="Enter your shipping address"
              name="input-7-4"
              v-model="address"
            >
            </v-textarea>
          </v-form>
          <v-simple-table>
            <tbody>
              <tr>
                <td>Order Total</td>
                <td class="text-right" style="width: 50px;"><b>{{ formatPrice(totalPrice) }}</b></td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-card-actions class="justify-center">
            <v-btn class="primary white--text mt-5" outlined @click="checkout" :disabled="carts.length === 0">CHECKOUT</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CartRow from '../components/CartRow'

export default {
  name: 'Cart',
  data () {
    return {
      name: '',
      address: '',
      productsDetail: []
    }
  },
  components: {
    CartRow
  },
  computed: mapState(['carts', 'totalPrice']),
  methods: {
    checkout () {
      console.log('checkout')
      this.carts.map(el => {
        this.productsDetail.push(`${el.Product.name} ${el.quantity} pcs`)
      })

      const email = JSON.parse(localStorage.getItem('user')).email

      const payload = {
        name: this.name,
        email,
        address: this.address,
        products: this.productsDetail.join(', '),
        total_price: this.totalPrice
      }
      this.$store.dispatch('doCheckout', payload)
      this.productsDetail = []
    },
    formatPrice (price) {
      let result = ''
      const strPrice = String(price)
      for (let i = 0; i < strPrice.length; i++) {
        if ((strPrice.length - i) % 3 === 0 && i !== 0) {
          result += ',' + strPrice[i]
        } else {
          result += strPrice[i]
        }
      }
      return `Rp. ${result}`
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>

</style>
