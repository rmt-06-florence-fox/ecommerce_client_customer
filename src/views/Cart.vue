<template>
<div>
    <img src="../assets/pattern-bg.jpg" alt="" id="bg">
    <h1 id="title">Cart</h1>
    <table class="table mt-4">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <DetailCart v-for="(cart, i) in carts" :key="cart.id" :i="i" :cart="cart"/>
        </tbody>
    </table>
    <div class="ctn mr-5">
    <button type="button" class="btn btn-info">Total: {{ toLocalStringPrice(totalPrice) }} </button>
    </div>
</div>
</template>

<script>
import DetailCart from '../components/DetailCart'
export default {
  name: 'Cart',
  components: {
    DetailCart
  },
  methods: {
    toLocalStringPrice (price) {
      const newPrice = price.toLocaleString('EN-US', { style: 'currency', currency: 'USD' })
      return newPrice
    }
  },
  created () {
    this.$store.dispatch('fetchCart')
    if (localStorage.access_token) {
      this.$store.commit('setLogin', true)
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      const cart = this.$store.state.carts
      let total = 0

      cart.forEach(el => {
        total += el.Product.price * el.quantity
      })
      return total
    }
  }
}
</script>

<style scoped>
.table {
  width: 92%;
  margin-left: 5%;
}

#title {
  text-align: center;
  margin-top: 2%;
}
.ctn {
  display: flex;
  justify-content: end;
}
</style>
