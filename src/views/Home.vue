<template>
  <div class="home">
    <img class="mt-5 mb-3" alt="MStore logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Muchsin Store" />
    <hr />
    <ProductDisplay
      class="mt-3"
      v-if="showProductDisplay == true"
    ></ProductDisplay>
    <WishList class="mt-3" v-if="showWishlist == true"></WishList>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ProductDisplay from "../components/ProductDisplay";
import WishList from "../components/WishList";

export default {
  name: "Home",
  components: {
    HelloWorld,
    ProductDisplay,
    WishList
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
    showWishlist() {
      return this.$store.state.showWishlist;
    },
    showProductDisplay() {
      return this.$store.state.showProductDisplay;
    }
  }
};
</script>
