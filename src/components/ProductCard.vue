<template>
  <div class="col-3">
    <!-- <p>{{ cart }} ini cart</p> -->
    <div class="">
        <b-card
            :img-src="product.imageUrl"
            img-alt="Image"
            img-top
            img-height="230px"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
        <h5 class="d-flex"><strong>{{ product.name }}</strong></h5>
        <h6 class="d-flex"><strong>Rp {{ product.price.toLocaleString('id') }}</strong></h6>
        <div v-if="product.stock === 0">
          <h6 class="text-danger"><strong>Not available</strong></h6>
          <b-button disabled style="width:100%" href="#" variant="primary" @click="addCart(product)"><i class="fa fa-cart-plus" style="font-size:24px"></i> <strong>Add to cart</strong></b-button>
        </div>
        <div v-else>
          <div>
            <h6 class="d-flex"><strong>Stocks ({{ product.stock }} items)</strong></h6>
            <b-button style="width:100%" href="#" variant="primary" @click="addCart(product)"><i class="fa fa-cart-plus" style="font-size:24px"></i> <strong>Add to cart</strong></b-button>
          </div>
        </div>
        </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
      disableAddToCart: false
    }
  },
  methods: {
    addCart (obj) {
      this.$store.dispatch('fetchCartById', obj.id)
        .then(data => {
          // console.log(data.data.quantity, '<<<')
          // console.log(this.product)
          // console.log(data.data, '<<')
          let currentQuantity
          if (!data.data) {
            currentQuantity = 0
          } else {
            currentQuantity = data.data.quantity
          }
          console.log(currentQuantity)
          if (obj.stock === 1) {
            this.$store.dispatch('addCart', {
              name: obj.name,
              imageUrl: obj.imageUrl,
              price: obj.price,
              quantity: 1,
              ProductId: obj.id
            })
              .then(data => {
                console.log('berhasil ditambahkan')
                this.disableAddToCart = false
                this.$store.dispatch('fetchCart')
                  .then(data => {
                    this.$store.commit('setCart', data)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
              .catch(err => {
                console.log(err)
              })
          }
          if (currentQuantity >= obj.stock - 1) {
            return 'Tidak bisa add'
          } else {
            this.$store.dispatch('addCart', {
              name: obj.name,
              imageUrl: obj.imageUrl,
              price: obj.price,
              quantity: 1,
              ProductId: obj.id
            })
              .then(data => {
                console.log('berhasil ditambahkan')
                this.disableAddToCart = false
                this.$store.dispatch('fetchCart')
                  .then(data => {
                    this.$store.commit('setCart', data)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
        .then(data => {
          console.log('berhasil fetchCart')
          this.$store.commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart.data
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
