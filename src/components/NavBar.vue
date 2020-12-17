<template>
  <nav class="navbar sticky-top navbar-light shadow bg-light">
    <a class="navbar-brand font-weight-bold" href="#">Terrarium Hobby Shop</a>
    <p v-if="isLogin == true" @click.prevent="jumpToMyCart">My Shopping Cart</p>
    <div>
      <button
        v-if="isLogin == false"
        @click.prevent="jumpToLogin"
        class="btn btn-sm btn-outline-success rounded-pill font-weight-bold text-dark"
        type="button"
      >
        Login
      </button>
      <button v-if="isLogin == true"
        class="btn btn-sm btn-outline-danger rounded-pill font-weight-bold text-dark"
        type="button"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    jumpToLogin() {
      this.$router.push({ name: "Login" });
    },
    jumpToMyCart() {
      this.$router.push({ name: "MyCart" });
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style>
</style>