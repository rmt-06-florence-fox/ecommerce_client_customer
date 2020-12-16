<template>
  <div>
    <TopBar />
    <SideBar />
    <BannerWrapper />
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '../components/TopBar.vue'
import SideBar from '../components/SideBar.vue'
import ProductList from '../components/ProductList.vue'
import BannerWrapper from '../components/BannerWrapper.vue'
export default {
  name: 'Home',
  components: {
    TopBar,
    SideBar,
    ProductList,
    BannerWrapper
  }
}
</script>
