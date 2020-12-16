<template>
  <div class="category">
    <router-link class="uk-button uk-button-text" :to="to">{{ category.name }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Category',
  computed: {
    to () {
      return `/${this.category.name}`
    }
  },
  props: ['category']
}
</script>

<style>

</style>
