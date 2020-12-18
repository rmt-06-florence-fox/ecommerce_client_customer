<template>
  <div class="container-fluid p-3 my-3 bg-dark text-white" id="form">
      <h1> Cart </h1>
    <div id="card">
      <product-cart-card v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div> <br>
        <!-- <h1> Total: </h1> -->
        <!-- <h2> Rp. {{totalPrice}} </h2> -->
        <button type="button" class="btn" id="checkout" @click="checkout">Checkout</button>
      </div>
  </div>
</template>

<script>
import ProductCartCard from '../components/ProductCartCard.vue'
export default {
  components: { ProductCartCard },
  name: 'Cart',
  computed: {
    products () {
      return this.$store.state.onCart
    }
  },
  data () {
    return {
      totalPrice: '1.000.000'
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(({ data }) => {
          this.$router.push('/home')
        })
        .catch(({ err }) => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

  #card {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: space-around;
  }
  #checkout {
    color: black;
    background-color: white;
    padding: 12px 28px;
    font-size: 20px;
  }

</style>
