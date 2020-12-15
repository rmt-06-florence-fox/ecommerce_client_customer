<template>
  <div id="app" class="h-100">
    <b-modal id="errors-modal" title="Ooops, error(s) happened" hide-footer>
      <Error />
    </b-modal>
    <router-view/>
  </div>
</template>
<script>
import Error from './components/Error.vue'
export default {
  components: {
    Error
  },
  computed: {
    errors () {
      return this.$store.state.errors
    }
  },
  watch: {
    errors () {
      if (this.errors.length > 0) {
        this.$bvModal.show('errors-modal')
        setTimeout(() => {
          this.$bvModal.hide('errors-modal')
        }, 2300)
      }
    }
  }
}
</script>
<style>
</style>
