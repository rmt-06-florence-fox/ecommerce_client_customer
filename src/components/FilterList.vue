<template>
  <a class="dropdown-item" href="#" @click='getCategory(data.category)'>{{ data.category }}</a>
</template>

<script>
export default {
  name: 'FilterList',
  props: ['data'],
  methods: {
    getCategory (category) {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
      this.$store.commit('setFilter', category)
    }
  }
}
</script>

<style>

</style>
