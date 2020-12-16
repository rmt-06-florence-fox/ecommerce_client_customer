<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">
        SHOPPING CART
      </p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-center">ITEM</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody v-if="carts.length > 0">
              <tr v-for="item in carts" :key="item.id">
                <td>
                  <v-list-item
                    key="1"
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.Product.image_url"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title >{{item.Product.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.Product.Category.name}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>{{item.Product.price}}</td>
                <td>
                  <v-btn @click="minusCart(item.id)" icon>
                    <v-icon small>
                      mdi-minus-circle
                    </v-icon>
                  </v-btn>
                  {{item.quantity}}
                  <v-btn @click="plusCart(item.id)" icon>
                    <v-icon small>
                      mdi-plus-circle
                    </v-icon>
                  </v-btn>
                </td>
                <td>{{item.Product.price * item.quantity}}</td>
                <td><a>X</a></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <v-simple-table>
            <tbody>
              <tr>
                <td>Order Total</td>
                <td class="text-right" style="width: 50px;"><b>{{totalPrice}}</b></td>
              </tr>
            </tbody>
          </v-simple-table>
          <div class="text-center">
            <v-btn class="primary white--text mt-5" outlined @click="checkout" :disabled="carts.length === 0">PROCEED TO CHECKOUT</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['carts', 'totalPrice']),
  methods: {
    minusCart (id) {
      this.$store.dispatch('minusCart', id)
    },
    plusCart (id) {
      this.$store.dispatch('plusCart', id)
    },
    checkout () {
      console.log('checkout')
    }
  },
  created () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style>

</style>
