<template>
  <div class="cart-page">
    <div class="cart-page-left">
      <h1 v-if="getCart.length == 0">YOUR CART IS EMPTY</h1>
      <div class="container-detail-card" v-for="(cart, i) in getCart" :key="i">
        <div class="left-detail">
          <img class="card-img-top" :src="cart.Product.image_url"  alt="Card image cap">
        </div>
        <div class="right-detail">
            <h5>{{cart.Product.name}}</h5>
            <div class="stock">
            <p>Quantity: {{cart.quantity}} </p>
            <button class="button-increment btn-primary m-1" @click="increaseQuantity(cart)"><i class="stock-increment fas fa-plus"></i></button>
            <button class="button-increment btn-danger m-1"  @click="decreaseQuantity(cart)"><i class="stock-increment fas fa-minus"></i>  </button>
            </div>
            <p>{{formatRupiah(cart.Product.price * cart.quantity)}}</p>
            <div class="action-button">
              <button @click="removeCart(cart.id)" class="btn-danger">Remove From Cart</button>
            </div>
        </div>
      </div>
    </div>
    <div class="card-page-right mt-5">
      <h5>TOTAL PRICE</h5>
      <p>{{formatRupiah(totalPrice)}}</p>
      <button class="btn-primary" @click="Checkout">checkout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    increaseQuantity (cart) {
      const newquantity = cart.quantity += 1
      const payload = {
        id: cart.id,
        quantity: newquantity
      }
      this.$store.dispatch('increaseQuantity', payload)
    },
    decreaseQuantity (cart) {
      const newquantity = cart.quantity -= 1
      const payload = {
        id: cart.id,
        quantity: newquantity
      }
      this.$store.dispatch('decreseQuantity', payload)
    },
    removeCart (id) {
      this.$store.dispatch('removeCart', id)
    },
    formatRupiah (number) {
      const numberString = number.toString()
      const jumlahSisa = numberString.length % 3
      const angkaAwalString = numberString.substr(0, jumlahSisa)
      const ribuan = numberString.substr(jumlahSisa).match(/\d{3}/g)

      if (ribuan) {
        const separator = jumlahSisa ? '.' : '' // kalau ada sisa, tambahkan separator
        return 'Rp. ' + angkaAwalString + separator + ribuan.join('.')
      } else {
        return `Rp. ${angkaAwalString}`
      }
    },
    Checkout () {
      const payload = this.$store.state.carts
      this.$store.dispatch('checkout', payload)
    }
  },
  created () {
    this.fetchCart()
    this.$store.commit('setLoginStatusOn')
  },
  computed: {
    getCart () {
      return this.$store.state.carts
    },
    totalPrice () {
      const cart = this.$store.state.carts
      let totalPrice = 0
      for (let i = 0; i < cart.length; i++) {
        totalPrice = totalPrice + cart[i].Product.price * cart[i].quantity
      }
      return totalPrice
    },
    getLoginStatus () {
      return this.$store.state.loginStatus
    }
  }
}
</script>

<style>
.cart-page {
  display: flex;
}
.cart-page-left {
  width: 70%;
  margin: 2rem;
  flex-wrap: wrap;
}
.right-detail {
  margin: 2rem;
}
.button-increment {
  width: 2vw;
  height: 2vw;
}
.stock-increment {
  font-size: 0.9rem;
  text-align: center;
}
.stock {
  display: flex;
}
</style>
