<template>
  <div class="all-products col-10 content uk-animation-fade">
    <div v-if="banners.length > 0" id="banner" class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slideshow="autoplay: true">
      <ul class="uk-slideshow-items">
        <li v-for="banner in banners" :key="banner.id">
          <img :src="banner.image_url" alt="">
        </li>
      </ul>

      <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
    </div>
    <div class="products-list">
      <Product
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import Product from './Product'
export default {
  name: 'AllProducts',
  computed: {
    products () {
      return this.$store.state.products
    },
    banners () {
      return this.$store.state.banners
    }
  },
  created () {
    this.$store.dispatch('getBanners')
  },
  components: {
    Product
  }
}
</script>

<style scoped>
#banner {
  margin-bottom: 20px;
  height: 800 !important;
  width: 1070.5px !important;
}

#simple-quote {
  font-family: 'Alfa Slab One', cursive;
  text-align: center;
  margin-right: 150px;
}

.all-products {
  display: flex;
  flex-direction: column;
}

.products-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
