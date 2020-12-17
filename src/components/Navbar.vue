<template>
  <div>
    <b-navbar class="navbar-horizontal shadow" toggleable="lg" type="light" variant="light">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="mr-auto">
        <b-nav-item><a><router-link to="/"><h4>Samson Tech</h4></router-link></a></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="btn btn-light mx-3"><i class="fas fa-shopping-cart"></i>Cart</b-nav-item>
        <b-nav-item class="btn btn-light mx-3"><i class="fas fa-sign-in-alt"></i>Login</b-nav-item>
        <b-nav-item class="btn btn-light mx-3"><i class="fas fa-sign-out-alt"></i>Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>

</style>
