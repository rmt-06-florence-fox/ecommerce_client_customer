<template>
  <div class="WishList">
    <h3><u>Your Wish List</u></h3>
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
    mdbRow
  },
  // methods: {
  //   fetchWishList() {
  //     this.$store.getters.productsOnWishList;
  //   },
  // },
  // created() {
  //   this.fetchWishList();
  // },

  computed: {
    productsOnWishList() {
      return this.$store.getters.productsOnWishList;
    }
  }
};
</script>
