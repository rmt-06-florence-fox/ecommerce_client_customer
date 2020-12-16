<template>
    <div class="mt-3 ml-3 fixed">
      <b-button v-b-toggle.sidebar-right variant="success">see categories</b-button>
      <b-sidebar id="sidebar-right" title="Categories" left shadow width="250px" z-index="2">
        <div class="px-3 py-2 mt-3">
          <!-- <b-list-group>
            <b-list-group-item v-for></b-list-group-item>
          </b-list-group> -->
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
