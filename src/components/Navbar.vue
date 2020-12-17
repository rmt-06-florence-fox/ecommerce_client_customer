<template>
  <nav class="navbar navbar-light fixed-top" style="background-color: #8c8b9b4a; color: #E2B91B; height: 7%">
    <div class="container-fluid">
      <h3>
        Br<i class="fas fa-shoe-prints"></i>.Shoes
      </h3>
      <form class="form-inline">
        <i class="fas fa-shopping-cart fa-lg" id="cart"></i>
        <b-tooltip target="cart" variant="secondary">cart</b-tooltip>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="btn-signIn"  style="border-radius: 25px; margin-left: 12px"><i class="fas fa-sign-in-alt fa-sm"></i></button>
        <b-tooltip target="btn-signIn" variant="success">sign in</b-tooltip>
        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" id="btn-signOut" style="border-radius: 25px; margin-left: 10px"><i class="fas fa-sign-out-alt fa-sm"></i></button>
        <b-tooltip target="btn-signOut" variant="danger">sign out</b-tooltip>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>
