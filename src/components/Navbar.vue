<template>
  <div class="shadow mb-3">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand @click="toHome" class="navbar-eco">IT Product Florence Fox<i class="fas fa-store text-white ml-2"></i></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="profile">
            <b-nav-item class="navbar-eco" @click="toCart"><i class="fas fa-shopping-cart text-white mr-1"></i><span class="text-white">Cart</span></b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-else>
            <b-nav-item class="navbar-eco" @click="toLogin"><span class="text-white">Login</span></b-nav-item>
            <b-nav-item class="navbar-eco" @click="toRegister"><span class="text-white">Register</span></b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right v-if="profile">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <span class="text-white">{{ profile.email }}</span>
            </template>
            <b-dropdown-item class="navbar-eco" @click="toWishlist">Wishlist</b-dropdown-item>
            <b-dropdown-item class="navbar-eco" @click="toHistory">History Transaction</b-dropdown-item>
            <b-dropdown-item class="navbar-eco" @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  computed: {
    profile () {
      return this.$store.state.profile
    }
  },
  methods: {
    toHome () {
      this.$router.push('/').catch(() => { })
    },
    toCart () {
      this.$router.push('/cart').catch(() => { })
    },
    toLogin () {
      this.$router.push('/login').catch(() => { })
    },
    toRegister () {
      this.$router.push('/register').catch(() => { })
    },
    toWishlist () {
      this.$router.push({ name: 'Wishlist' }).catch(() => { })
    },
    toHistory () {
      this.$router.push({ name: 'History' }).catch(() => { })
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$store.commit('GETUSER', null)
      if (this.$route.name === 'History' || this.$route.name === 'Wishlist') {
        this.$router.push('/').catch(() => { })
      }
    }
  }
}
</script>

<style>
.navbar-eco {
  cursor: pointer;
}
</style>
