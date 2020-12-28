<template>
  <div id="app">
    <Navbar />
    <carousel>
      <Banners
        v-for="banner in banners"
        :key="banner.id"
        :banner="banner"/>
    </carousel>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Banners from './components/Banners'
export default {
  components: {
    Navbar,
    Banners
  },
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  created () {
    this.$store.dispatch('fetchBanners')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
