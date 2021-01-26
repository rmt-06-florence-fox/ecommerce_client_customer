<template>
    <div>
    <br><h1 class="yourcart">Your Cart</h1><br>
        <br><table>
            <thead style="width: 200px;">
                <tr>
                    <th>Product</th>
                    <th style="width: 200px;">Name</th>
                    <th style="width: 200px;">Price</th>
                    <th style="width: 200px;">Quantity</th>
                    <th style="width: 200px;">Action</th>
                </tr>
            </thead>
            <tbody>
                <DataCart v-for="cart in carts" :key="cart.id" :cart="cart"></DataCart>
            </tbody>
        </table>
        <img class="justify-content-end" width="42" height="42" src="../assets/credit-card.svg" alt=""><h5 @click.prevent="checkout">Checkout</h5>
    </div>
</template>

<script>
import DataCart from '../components/DataCart'
export default {
  components: { DataCart },
  name: 'Cart',
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('fetchCart')
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  }
}
</script>

<style>
.yourcart {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
</style>
