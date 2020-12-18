<template>
    <div class="mt-3 ml-3 fixed">
      <b-button v-b-toggle.sidebar-right variant="success">see categories</b-button>
      <b-sidebar id="sidebar-right" title="Categories" left shadow width="250px" z-index="2">
        <div class="px-3 py-2 mt-3">
          <b-list-group>
            <b-list-group-item class="btn" @click="filterProduct('')">All</b-list-group-item>
            <b-list-group-item v-for="category in categories" :key="category" class="btn" @click="filterProduct(category)">
              {{ category }}
            </b-list-group-item>
            <b-list-group-item v-b-toggle.sidebar-right class="btn mt-3 btn-dark bg-dark">close categories</b-list-group-item>
          </b-list-group>
        </div>
      </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  computed: {
    categories () {
      return this.$store.getters.categories
    }
  },
  methods: {
    filterProduct (category) {
      this.$store.commit('setFilter', category)
    }
  }
}
</script>

<style>

</style>
