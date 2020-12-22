<template>
  <div class="home">
    <div v-if="showProductDisplay == true">
      <img class="mt-5 mb-3" alt="MStore logo" src="../assets/logo.png" />
      <Headline msg="Welcome to Muchsin Store" />
      <hr />
      <ProductDisplay class="mt-3"></ProductDisplay>
    </div>
    <WishList class="mt-3" v-if="showWishlist == true"></WishList>
    <Cart class="mt-3" v-if="showCart == true"></Cart>
  </div>
</template>

<script>
// @ is an alias to /src
import Headline from "@/components/Headline.vue";
import ProductDisplay from "../components/ProductDisplay";
import Cart from "../components/Cart";
import WishList from "../components/WishList";

export default {
  name: "Home",
  components: {
    Headline,
    ProductDisplay,
    Cart,
    WishList,
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
    showWishlist() {
      return this.$store.state.showWishlist;
    },
    showCart() {
      return this.$store.state.showCart;
    },
    showProductDisplay() {
      return this.$store.state.showProductDisplay;
    },
  },
};
</script>
