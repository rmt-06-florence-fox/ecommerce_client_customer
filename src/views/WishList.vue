<template>
  <div class="WishList">
    <h1>Your Wish List</h1>
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
import ProductCard from "../components/ProductCard";
import { mdbContainer, mdbRow } from "mdbvue";
export default {
  name: "WishList",
  components: {
    ProductCard,
    mdbContainer,
    mdbRow
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    }
  },
  created() {
    this.fetchData();
  },

  computed: {
    productsOnWishList() {
      return this.$store.getters.productsOnWishList;
    }
  }
};
</script>
