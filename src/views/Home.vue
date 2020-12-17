<template>
  <div class="home">
    <img class="mt-5 mb-3" alt="MStore logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Muchsin Store" />
    <hr />
    <ProductDisplay class="mt-5"></ProductDisplay>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ProductDisplay from "../components/ProductDisplay";

export default {
  name: "Home",
  components: {
    HelloWorld,
    ProductDisplay
  }
};
</script>
