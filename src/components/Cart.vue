<template>
  <div class="my-5 mx-5">
    <mdb-row>
      <mdb-col col="12">
        <mdb-card>
          <mdb-card-body>
            <div>
              <mdb-tbl
              v-if="cart.length > 0"
              responsive>
                <mdb-tbl-head color="#c0ca33 lime darken-1" textWhite>
                  <tr>
                    <th colspan="2">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </mdb-tbl-head>
                <!-- {{cart}} -->
                <mdb-tbl-body>
                  <tr
                  v-for="cart in cart"
                  :key="cart.id"
                  scope="row">
                  <th scope="row">
                  <img :src="cart.Product.image_url" :alt="cart.Product.name" class="img-thumbnail" style="width: 200px">
                  </th>
                  <td>{{ cart.Product.name }}</td>
                  <td>Rp. {{ formatPrice(cart.Product.price) }}</td>
                  <td>
                  <div class="d-flex justify-content-around">
                    <span class="d-flex flex-column justify-content-center">
                  {{cart.amount}}
                    </span>
                    <span class="d-flex flex-column justify-content-center">
                  <mdb-btn
                  @click.native="plusAmount(cart.ProductId, cart.amount, cart.Product.stock)"
                  color="#ff6e40 deep-orange darken-2" size="sm" class="my-2 mx-0"><mdb-icon icon="plus-square" /></mdb-btn>
                  <mdb-btn
                  @click.native="minusAmount(cart.ProductId, cart.amount)"
                 color="#558b2f light-green darken-3" size="sm" class="my-2 mx-0"><mdb-icon icon="minus-square" /></mdb-btn>
                    </span>
                  </div>
                  </td>
                  <td> {{ formatPrice(cart.Product.price * cart.amount) }}</td>
                  <td>
                  <mdb-btn
                  @click.native="deleteProd(cart.ProductId)"
                  color="danger" size="sm" class="m-0"><mdb-icon icon="trash" /></mdb-btn>
                  </td>
                  </tr>
                </mdb-tbl-body>
              </mdb-tbl>
            </div><br> <h1 style= "align-content: flex-end "> TOTAL ALL : {{totalPrice}}</h1>
          <mdb-btn
          v-if="cart.length > 0"
          @click.native="checkout"
          color="primary">Checkout</mdb-btn>
          <mdb-container
          v-else>
            No Products yet
          </mdb-container>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    cart () {
      return this.$store.state.cart
    },
    totalPrice () {
      let totalPrice = 0
      const carts = this.cart
      for (let i = 0; i < carts.length; i++) {
        totalPrice += carts[i].total
      }
      return totalPrice
    }
  },
  methods: {
    plusAmount (ProductId, amount, stock) {
      console.log(ProductId, amount, stock)
      amount++
      if (amount <= stock) {
        const payload = {
          ProductId,
          amount
        }
        this.$store.dispatch('patchCart', payload)
          .then(_ => this.$store.dispatch('fetchCart'))
          .catch(({ response }) => console.log(response.data))
      } else {
        this.$vToastify.error('You\'ve reached the limit of available stock!')
      }
    },
    minusAmount (ProductId, amount) {
      amount--
      const payload = {
        ProductId,
        amount
      }
      if (amount > 0) {
        this.$store.dispatch('patchCart', payload)
          .then(_ => this.$store.dispatch('fetchCart'))
          .catch(({ response }) => {
            this.$vToastify.error(response.data.error)
          })
      } else {
        this.$vToastify.prompt({
          body: 'Are you sure you want to remove this product from your cart?',
          position: 'center-center',
          answers: { Yes: true, No: false }
        })
          .then(val => {
            if (val) {
              this.$store.dispatch('deleteCart', payload)
                .then(_ => this.$store.dispatch('fetchCart'))
                .catch(({ response }) => {
                  this.$vToastify.error(response.data.error)
                })
            }
          })
      }
    },
    deleteProd (ProductId) {
      this.$vToastify.prompt({
        body: 'Are you sure you want to remove this product from your cart?',
        answers: { Yes: true, No: false }
      })
        .then(val => {
          if (val) {
            const payload = {
              ProductId
            }
            this.$store.dispatch('deleteCart', payload)
          }
          if (this.cart.length === 0) {
            this.$route.push('/cart')
          }
        })
    },
    checkout () {
      this.$vToastify.prompt({
        body: 'Checkout all items?',
        answers: { Yes: true, No: false }
      })
        .then(val => {
          if (val) {
            return this.$store.dispatch('checkoutCart')
          } else {
            throw new Error('cancelled buy')
          }
        })
        .then(_ => {
          this.$store.dispatch('fetchCart')
          this.$vToastify.success('Thank you for buying our products!')
          this.$store.dispatch('fetchCategories')
          this.$store.dispatch('fetchAllProducts')
        })
        .catch(err => {
          if (err.message !== 'cancelled buy') this.$vToastify.error(err.response.data.error)
        })
    },
    formatPrice (price) {
      return this.$store.getters.formatPrice(price)
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchAllProducts')
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>
</style>
