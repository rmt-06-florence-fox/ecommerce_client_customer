<template>
  <div>
    <b-sidebar id="sidebar" width="15rem" title="Categories" shadow>
      <ul class="nav category-list-container ml-3 text-left">
        <li class="nav-item">
          <a v-b-toggle.sidebar @click="setSearchKey(null)" class="nav-link">All Categories</a>
        </li>
        <CategoryList v-for="category in categories" :key="category.id"
          :category="category">
        </CategoryList>
      </ul>
    </b-sidebar>
  </div>
</template>

<script>
import CategoryList from './CategoryList'
export default {
  name: 'SideBar',
  methods: {
    setSearchKey (category) {
      const searchKey = {
        by: 'category',
        words: category
      }
      this.$store.commit('SET_SEARCH_KEY', searchKey)
      this.$store.dispatch('fetchProducts')
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  components: {
    CategoryList
  }
}
</script>

<style>
  /* .side-bar {
    min-height: 100vh;
    background-color: #f8f9fa;
    position:fixed;
    min-width: 12rem
  } */

  .category-list-container {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .nav-link:hover {
    text-decoration: none;
    cursor: pointer;
    color: #41B883;
  }

  .category-title {
    color: black;
    font-weight: 700;
  }

  .nav-link {
    color: black;
    font-weight: 500;
  }

</style>
