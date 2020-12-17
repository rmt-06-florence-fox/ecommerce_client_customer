<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/chart">Chart {{ allCharts.length }}</router-link>
        <router-link to="/login" v-if="!access_token">Login</router-link>
        <a href="" @click="logout" v-if="access_token">Logout</a>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      access_token: localStorage.getItem('access_token')
    }
  },
  computed: {
    allCharts () {
      return this.$store.state.charts
    }
  },
  created () {
    this.$store.dispatch('getAllCharts')
    this.access_token = localStorage.getItem('access_token')
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style>
#nav {
  display: flex;
  justify-content: space-between;
  /* border: 1px solid black; */
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
  padding: 10px 80px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
