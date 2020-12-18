<template>
  <ul>
    <li class="text-danger h5" v-for="(error, idx) in errors" :key="idx">
      {{error}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ErrorPage',
  computed: {
    errors () {
      return this.$store.state.errors
    }
  }
}
</script>

<style>

</style>
