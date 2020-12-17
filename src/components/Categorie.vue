<template>
  <div>
    {{dataItems}}
    <button @click="getData" v-for="data in dataItems" :key="data.id" type="button" class="btn btn-link">{{data.name}}</button>
  </div>
</template>

<script>
export default {
  name: 'Category',
  methods: {
    fetchCategory () {
      this.$store.dispatch('fetchCategory')
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
