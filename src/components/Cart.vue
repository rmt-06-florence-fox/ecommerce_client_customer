<template>
  <div class="Cart">
    <img class="custom-logo" src="../assets/logo.png" />

    <mdb-container class="d-flex">
      <!-- Chart Item -->
      <section class="d-flex flex-column text-center my-5 col-sm-6">
        <h3 class="text-left">
          Product List
          <hr />
        </h3>
        <mdb-col class="justify-content-center">
          <CartItem
            v-for="product in productsAddedToCart"
            :key="product.id"
            :product="product"
           
          ></CartItem>
        </mdb-col>
      </section>
      <!-- Chart Summary -->
      <section v-if="cartCount != 0" class="d-flex flex-column text-center my-5 col-sm-6">
        <mdb-col class="justify-content-center">
          <h2 class="h2-responsive font-weight-bold text-center ">Summary</h2>
          <CartSummary ></CartSummary>
        </mdb-col>
      </section>
    </mdb-container>

    <h6 v-if="cartCount == 0">Your Cart is empty</h6>
  </div>
</template>

<script>
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import { mdbContainer, mdbCol } from "mdbvue";
export default {
  name: "Cart",
  components: {
    CartItem,
    CartSummary,
    mdbContainer,
    mdbCol,
  },

  computed: {
    productsAddedToCart() {
      return this.$store.getters.productsAddedToCart;
    },
    cartCount() {
      return this.productsAddedToCart.length;
    },
  },
};
</script>
<style>
.custom-logo {
  height: 50;
  width: 50;
}
</style>
