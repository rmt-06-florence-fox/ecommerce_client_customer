<template>
  <div style="margin-top:90px">
    <!-- <p>{{ cart }}</p> -->
    <div v-if="cart.length === 0">
      <h1 style="margin-top: 230px">Your cart is empty</h1>
      <img src="https://img.freepik.com/free-vector/happy-tiny-people-listening-spiritual-music_74855-5870.jpg?size=626&ext=jpg" alt="">
    </div>
    <div v-else>
       <div class="container" >
         <!-- <p>{{ currentPrice.toLocaleString('id') }} {{ totalPrice.toLocaleString('id') }}</p> -->
        <div class="row">
          <div class="col">
            <CartsCard v-for="item in cart" :key="item.id" :item="item" :products="products" class="mt-4"></CartsCard>
          </div>
          <div class="col-md-auto">
            <div class="mt-3">
              <h1><strong>Total</strong></h1>
              <h1 v-if="updatePrice">Rp {{ currentPrice.toLocaleString('id') }}</h1>
              <h1 v-else>Rp {{ totalPrice.toLocaleString('id') }}</h1>
            </div>
              <button @click="checkout" class="btn btn-success mt-3 d-inline"><h5 class="mr-2"><strong>Checkout</strong></h5> <i class="fa fa-handshake-o" style="font-size:24px"></i></button>
          </div>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
import CartsCard from '../components/CartsCard'
export default {
  name: 'Cart',
  components: {
    CartsCard
  },
  data () {
    return {
      totalPrice: 0
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
        .then(({ data }) => {
          this.$store.commit('setCart', data)
          data.forEach(el => {
            this.totalPrice += el.quantity * el.price
          })
          this.$store.commit('setCurrentPrice', this.totalPrice)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    checkout () {
      console.log('masuk pak eko')
      // console.log(this.cart)
      // console.log(arr)
      const arr = this.cart.map(el => {
        return {
          name: el.name,
          imageUrl: el.imageUrl,
          price: el.price,
          quantity: el.quantity,
          UserId: el.UserId,
          ProductId: el.ProductId
        }
      })
      const obj = {
        data: arr
      }
      this.$store.dispatch('addHistory', obj)
        .then(_ => {
          console.log('berhasil')
          arr.forEach(el => {
            this.products.forEach(element => {
              if (el.ProductId === element.id) {
                this.$store.dispatch('updateProduct', {
                  id: element.id,
                  name: el.name,
                  imageUrl: el.imageUrl,
                  price: el.price,
                  stock: element.stock - el.quantity
                })
              }
            })
          })
          this.cart.forEach(el => {
            this.$store.dispatch('destroyCart', el.id)
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchCart()
    this.fetchProducts()
  },
  computed: {
    cart () {
      console.log(this.$store.state.cart)
      return this.$store.state.cart
    },
    products () {
      return this.$store.state.products
    },
    addTotalPrice () {
      return this.$store.state.addTotalPrice
    },
    updatePrice () {
      return this.$store.state.updatePrice
    },
    currentPrice () {
      return this.$store.state.currentPrice
    }
  }
}
</script>

<style>
template {
  height: 100%;
}
</style>
