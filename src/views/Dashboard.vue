<template>

  <section class="section pt-5">
    <div class="container is-fluid">
      <h1 class="title">Products</h1>
      <div class="field">
        <div class="control" :class="{'is-loading': isLoadingSearch}">
          <input v-model="searchQuery" class="input" type="text" placeholder="Filter by name">
        </div>
      </div>
      <div class = "columns is-multiline">
        <ProductCard
          v-for="product in filtered" :key="product.id"
          :product="product"
          @toggleModal='activateModal'
          @destroy='destroy'
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from '../components/ProductCard'
// import axios from '../config/axiosInstance'

export default {
  name: 'Dashboard',
  components: {
    ProductCard
  },
  data () {
    return {
      targetEdit: {},
      query: '',
      searchQuery: ''
    }
  },
  methods: {
    activateModal (id) {
      this.$store.dispatch('fetchProductsById', id)
    },
    closeModal () {
      this.$store.commit('changeIsActive')
      this.fetchProducts()
    },
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    destroy (id) {
      this.$store.dispatch('destroy', id)
    }
  },
  created () {
    this.fetchProducts()
    this.$store.dispatch('fetchCarts')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    isActive () {
      return this.$store.state.isActive
    },
    filtered () {
      return this.$store.getters.filtered(this.query)
    },
    carts () {
      return this.$store.state.carts
    },
    isLoadingSearch () {
      return this.$store.state.isLoadingSearch
    }
  },
  watch: {
    searchQuery: function (val) {
      this.$store.commit('changeIsLoading')
      this.query = val
    }
  }
}
</script>

<style scoped>
</style>
