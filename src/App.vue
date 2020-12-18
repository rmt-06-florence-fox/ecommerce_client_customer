<template>
  <div id="app">
    <Header></Header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> 
    </div> -->
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return{}
  },

  created() {
    if (!localStorage.access_token) {
      // this.$router.push('/login')
      this.$store.commit("SET_LOGIN", false);
    } else {
      this.$store.commit("SET_LOGIN", true);
      // this.$router.push("/");
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

$image-path: "~@/../mdb/mdbvue/img";
@import "~@/../mdb/mdbvue/scss/mdb-free.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

html {
  width: 100vw;
}
</style>
