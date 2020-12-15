<template>
  <div>
    <TopBar />
    <SideBar />
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '../components/TopBar.vue'
import SideBar from '../components/SideBar.vue'
import ProductList from '../components/ProductList.vue'
export default {
  name: 'Home',
  components: {
    TopBar,
    SideBar,
    ProductList
  }
}
</script>
