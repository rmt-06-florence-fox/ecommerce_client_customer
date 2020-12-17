<template>
    <div class="container">
        <NavDashboard />
        <router-view/>
        Gibson 2020
    </div>
</template>

<script>
import NavDashboard from '../components/NavDashboard.vue'

export default {
  name: 'Dashboard',
  components: {
    NavDashboard
  }
}
</script>

<style>

</style>
