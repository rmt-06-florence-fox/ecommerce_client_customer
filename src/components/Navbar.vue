<template>
  <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid" id="nav">
    <router-link class="navbar-brand" to="/">E-Commerce</router-link>
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" to="/login">Login</router-link>
    <router-link class="nav-link" to="/register">Register</router-link>
    <router-link class="nav-link" to="/cart">Cart</router-link>
  </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>
#nav a {
  font-weight: bold;
  color: grey;
}
#nav a.router-link-exact-active {
  color: white;
}
</style>
