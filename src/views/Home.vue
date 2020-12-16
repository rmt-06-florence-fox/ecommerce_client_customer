<template>
  <div class="home">
    <NavbarHome></NavbarHome>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarHome from '../components/NavbarHome'

export default {
  name: 'Home',
  components: {
    NavbarHome
  }
}
</script>
