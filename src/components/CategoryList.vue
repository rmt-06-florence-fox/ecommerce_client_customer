<template>
  <li class="nav-item">
    <a v-b-toggle.sidebar @click.prevent="setSearchKey(category.name)"  class="nav-link">{{ formatTitle(category.name) }}</a>
  </li>
</template>

<script>
export default {
  name: 'CategoryList',
  props: ['category'],
  methods: {
    formatTitle (str) {
      var splitStr = str.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },
    setSearchKey (category) {
      const searchKey = {
        by: 'category',
        words: category
      }
      console.log(searchKey)
      this.$store.commit('SET_SEARCH_KEY', searchKey)
      this.$store.dispatch('fetchProducts')
    }
  }
}
</script>

<style>

</style>
