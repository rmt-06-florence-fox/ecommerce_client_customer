<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand
        href="/"
        to="/"
        @click.prevent="showItem('ProductDisplay')"
        ><b-img id="brand-logo" src="../assets/logo2.png"
      /></b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item disabled text-muted
          ><h5><strong>| Muchsin Store |</strong></h5></b-nav-item
        >
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="m-auto">
          <b-nav-form class="m-auto text-center">
            <b-form-input
              margin="auto"
              style="min-width: 450px"
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
              class="mr-3"
              >Register</b-button
            >
            <b-button href="/" to="/login" variant="outline-light" class="mr-3"
              >Log In</b-button
            >
          </b-button-group>
          <b-avatar
            variant="dark"
            icon="cart"
            badge
            badge-top
            badge-offset="-0.5em"
            badge-variant="success"
            href="/"
            v-if="isLogin == true"
            @click.prevent="showItem('Cart')"
            ><template #badge>{{cartCount}}</template></b-avatar
          >

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
      name: localStorage.name,
    };
  },

  components: {},

  computed: {
    cartCount() {
      return this.$store.getters.productsAddedToCart.length;
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
    // showCheckoutModal() {
    //   this.$store.commit("showCheckoutModal", true);
    // },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
#brand-logo {
  height: 40px;
  margin: 0px;
  padding: 0px;
}
</style>
