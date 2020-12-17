<template>
  <div id="app" class="h-100">
    <b-modal id="errors-modal" title="Ooops, error(s) happened" hide-footer>
      <Error />
    </b-modal>
    <b-modal id="success-modal" title="Yeaaaaaaay" hide-footer>
      <Success />
    </b-modal>
    <router-view/>
  </div>
</template>
<script>
import Error from './components/Error.vue'
import Success from './components/Success.vue'
export default {
  components: {
    Error,
    Success
  },
  computed: {
    errors () {
      return this.$store.state.errors
    },
    success () {
      return this.$store.state.successMessage
    }
  },
  watch: {
    errors () {
      if (this.errors.length > 0) {
        this.$bvModal.show('errors-modal')
      } else {
        this.$bvModal.hide('errors-modal')
      }
    },
    success () {
      if (this.success.length > 0) {
        this.$bvModal.show('success-modal')
      } else {
        this.$bvModal.hide('success-modal')
      }
    }
  }
}
</script>
<style>
</style>
