<template>
  <div id="cart" class="container-fluid">
    <div class="row no-gutters">
      <div class="col-sm-8">
        <div class="card w-85" style="margin-right: 10%">
          <div class="card-body overflow-auto" style="height: 80vh">
            <CartList
            v-for="cart in carts"
            :key="cart.id"
            :cart="cart"
            />
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="card border-info mb-3" style="max-width: 18rem;">
          <div class="card-header">
            <h3>Total Price</h3>
          </div>
          <div class="card-body">
            <h5 class="card-title">Info card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from '../components/CartList'

export default {
  name: 'Cart',
  components: {
    CartList
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>
  #cart {
    display: flex;
    justify-content: space-around;
    margin-top: 5%;
    margin-bottom: 5%;
  }
</style>
