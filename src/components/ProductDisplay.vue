<template>
  <div class="ProductDisplay">
    <h3><u>Best Collections</u></h3>
    <hr />
    <mdb-container>
      <section class="text-center my-5">
        <mdb-row class="justify-content-start">
          <ProductCard
            v-for="product in productList"
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
  name: "ProductDisplay",
  components: {
    ProductCard,
    mdbContainer,
    mdbRow
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    }
  }
};
</script>
