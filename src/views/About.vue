<template>
  <div class="about">
    <p>This is an product page</p>
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
import ProductCard from "../components/ProductCard";
import { mdbContainer, mdbRow } from "mdbvue";
export default {
  name: "About",
  components: {
    ProductCard,
    mdbContainer,
    mdbRow,
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchData");
    },
  },
  created() {
    this.fetchData();
  },
  computed: {
    productList() {
      return this.$store.state.productList;
    },
  },
};
</script>
