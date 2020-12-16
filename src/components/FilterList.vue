<template>
  <a class="dropdown-item" href="#" @click='getCategory(data.id)'>{{ data.category }}</a>
</template>

<script>
export default {
  name: 'FilterList',
  props: ['data'],
  methods: {
    getCategory (id) {
      this.$store.getters.getCategoryById(id)
    }
  }
}
</script>

<style>

</style>
