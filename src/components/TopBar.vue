<template>
 <div class="sticky-top">
  <b-navbar toggleable="lg" type="dark" variant="success">
    <b-navbar-brand href="#"><h3>Heroes Station</h3></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
        <b-button v-b-toggle.sidebar-right variant="success">see categories</b-button>
        <b-nav-item><b-icon icon="cart3" variant="light" class="mr-4" font-scale="2"></b-icon></b-nav-item>
        <b-button class="border btn-dark btn text-white">Log Out</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
