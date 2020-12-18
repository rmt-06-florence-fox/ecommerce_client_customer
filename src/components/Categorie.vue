<template>
  <div>
    <!-- {{dataItems}} -->
    <button @click="getData(id)" v-for="data in dataItems"
    :key="data.id" :data="data.Products" type="button" class="btn btn-link">{{data.name}}</button>
    <ProductFilter></ProductFilter>
  </div>
</template>

<script>
import ProductFilter from '../views/ProductFilter.vue'
export default {
  name: 'Category',
  components: {
    ProductFilter
  },
  methods: {
    fetchCategory () {
      this.$store.dispatch('fetchCategory')
    },
    getData () {
      this.$router.push('/maintenance')
    }
  },
  created () {
    this.fetchCategory()
  },
  computed: {
    dataItems () {
      return this.$store.state.dataCategory
    }
  }
}
</script>

<style>

</style>
