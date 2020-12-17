<template>
  <div>
    <NavbarDashboard></NavbarDashboard>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarDashboard from '../components/NavbarDashboard'

export default {
  name: 'Dashboard',
  components: {
    NavbarDashboard
  }
}
</script>
