<template>
  <div class="container-fluid p-3 my-3 bg-dark text-white" id="form">
    <navbar />
    <h1> Home </h1>
    <div id="card">
      <product-home-card />
      <product-home-card />
      <product-home-card />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ProductHomeCard from '../components/ProductHomeCard.vue'
// @ is an alias to /src

export default {
  components: { ProductHomeCard, Navbar },
  name: 'Home'
}
</script>

<style>

#card {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: baseline;
  align-content: space-around;
}

</style>
