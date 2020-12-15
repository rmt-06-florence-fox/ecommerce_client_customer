<template>
    <div>
      <b-sidebar id="sidebar-right" title="Categories" right shadow width="250px" z-index="2">
        <div class="px-3 py-2 mt-3">
          <h4>Caregories here</h4>
          <b-button v-b-toggle.sidebar-right variant="dark" class="mt-2 mb-2">close categories</b-button>
        </div>
      </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style>

</style>
