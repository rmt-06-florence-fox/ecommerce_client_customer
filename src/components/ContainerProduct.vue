<template>
  <!-- component -->
    <div class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <CardProduct v-for="item in products" :key="item.id" :item="item"/>
        </div>
    </div>
</template>

<script>
import CardProduct from './CardProduct'
export default {
  name: 'ContainerProduct',
  components: {
    CardProduct
  },
  computed: {
    products () {
      return this.$store.getters.filteredProduct
    }
  }
}
</script>

<style>

</style>
