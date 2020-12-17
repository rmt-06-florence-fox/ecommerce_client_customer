<template>
  <div class="ProductDisplay">
    <h4><u>Best Collections</u></h4>
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
  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    }
  },
  created() {
    this.fetchData();
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    }
  }
};
</script>
