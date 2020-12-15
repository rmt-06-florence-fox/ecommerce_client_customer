<template>
  <div class="home-page">
    <div class="home-container">
      <div class="home-left">
        <div class="category-list">
          <category @lemparCategoryName="lemparCategoryName"></category>
        </div>
      </div>
      <div class="home-right">
        <div class="container-product">
          <product v-for="product in getProduct" :key="product.id" :product="product"></product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import product from '../components/product.vue'
import category from '../components/category.vue'

export default {
  name: 'Home',
  components: {
    product,
    category
  },
  data () {
    return {
      filterCategory: '',
      toggle: false
    }
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    },
    lemparCategoryName (name) {
      this.filterCategory = name
    },
    changeToggle () {
      this.toggle = !this.toggle
    }
  },
  created () {
    this.fetchProduct()
  },
  computed: {
    getProduct () {
      return this.$store.getters.filteredProduct(this.filterCategory)
    }
  }
}
</script>
<style scoped>
.home-container {
  display: flex;
}
.home-left {
  /* background: #24001e; */
  width: 20%;
}
.container-product {
  display: flex;
  justify-content:left;
  margin-left: 1rem;
  flex-wrap: wrap;
}

</style>
