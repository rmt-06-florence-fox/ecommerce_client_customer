<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" @click.prevent="showItem('ProductDisplay')"
        >Muchsin Store</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item disabled text-muted
            ><em>| &nbsp; your everday style</em></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="m-auto">
          <b-nav-form>
            <b-form-input
              style="width: 400px"
              size="sm"
              class="sm"
              placeholder="Search"
            ></b-form-input>
          </b-nav-form>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-2">
          <b-button-group v-if="isLogin == false">
            <b-button
              href="/"
              to="/register"
              variant="outline-light"
              class="mr-3 p-2"
              >Register</b-button
            >
            <b-button
              href="/"
              to="/login"
              variant="outline-light"
              class="mr-3 p-2"
              >Log In</b-button
            >
          </b-button-group>
          <b-nav-item-dropdown right v-if="isLogin == true">
            <!-- Using 'button-content' slot -->
            <template #button-content> Welcome, {{ name }} </template>
            <b-dropdown-item class="ml-2" @click.prevent="showItem('WishList')"
              >Wishlist</b-dropdown-item
            >
            <b-dropdown-item class="ml-2" @click="logout"
              >Log Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",


  data() {
    return {
      name: localStorage.name
    }
      
  },

  components: {},

  computed: {
    numProductsAdded() {
      return this.$store.getters.productsAdded.length;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },

  methods: {
    login() {
      this.$store.dispatch("login");
    },

    showItem(item) {
      this.$store.dispatch("showItem", item);
    },
    showCheckoutModal() {
      this.$store.commit("showCheckoutModal", true);
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
