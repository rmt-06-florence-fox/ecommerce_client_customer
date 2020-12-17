<template>
  <div class="home">
    <h1 class="text-center">Our Latest Products</h1>
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :products="product"
    ></ProductCard>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "Home",
  components: {
    ProductCard,
  },
  created() {
    this.$store.dispatch("fetchProducts");
    if(localStorage.getItem("access_token")){
      this.$store.commit('SET_LOGINSTATUS', true)
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>
