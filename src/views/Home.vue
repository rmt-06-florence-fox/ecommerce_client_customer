<template>
  <div class="home">
    <ProductList></ProductList>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '../components/ProductList'

export default {
  name: 'Home',
  components: {
    ProductList
  }
}
</script>
