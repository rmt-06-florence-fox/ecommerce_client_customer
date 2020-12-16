<template>
  <div class="home">
    <Navbar/>
    <ProductList/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import ProductList from '../components/ProductList'

export default {
  name: 'Home',
  methods: {
  },
  components: {
    Navbar,
    ProductList
  }
}
</script>
