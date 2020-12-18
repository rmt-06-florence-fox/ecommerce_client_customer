<template>
  <div class="WishList">
    <img class="custom-logo" src="../assets/logo.png" />
    <h3 class="text-left ml-5 pl-2">Your Wish List</h3>
    <hr />
    <mdb-container>
      <section class="text-center my-5">
        <mdb-row class="justify-content-center">
          <ProductCard
            v-for="product in productsOnWishList"
            :key="product.id"
            :product="product"
          ></ProductCard>
        </mdb-row>
      </section>
    </mdb-container>
    <h6 class="mt-5 pt-5" v-if="wishlistCount == 0">Your wishlist is empty</h6>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";
import { mdbContainer, mdbRow } from "mdbvue";
export default {
  name: "WishList",
  components: {
    ProductCard,
    mdbContainer,
    mdbRow,
  },

  computed: {
    productsOnWishList() {
      return this.$store.getters.productsOnWishList;
    },
    wishlistCount() {
      return this.productsOnWishList.length;
    },
  },
};
</script>
<style>
.custom-logo {
  height: 10;
  width: 10;
}
</style>
