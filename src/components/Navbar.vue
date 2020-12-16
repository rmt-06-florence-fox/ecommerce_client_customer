<template>
 <nav class="navbar sticky-top navbar-light shadow bg-light">
    <button class="btn btn-sm btn-outline-primary rounded-pill font-weight-bold text-dark mr-2"
      type="button"
      @click='goMainPage'>
      <i class="fas fa-book"></i>
    </button>
    <a class="navbar-brand font-weight-bold">Welcome to my humble bookshop</a>
    <div class="mr-2">
      <button class="btn btn-sm btn-outline-primary rounded-pill font-weight-bold text-dark mr-2"
        v-if="!isLogin"
        type="button"
        @click="goLogin">
        Login
      </button>
      <button class="btn btn-sm btn-outline-primary rounded-pill font-weight-bold text-dark mr-2"
        v-if="!isLogin"
        type="button"
        @click="goRegister">
        Register
      </button>
      <div v-else-if="isLogin">
        <button class="btn btn-sm btn-outline-primary rounded-pill font-weight-bold text-dark mr-2"
          type="button"
          @click='goHistories'>
          <i class="fas fa-history"></i>
        </button>
        <button class="btn btn-sm btn-outline-primary rounded-pill font-weight-bold text-dark mr-2"
          type="button"
          @click='goCart'>
          <i class="fas fa-shopping-cart"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger rounded-pill font-weight-bold text-dark mr-2"
          type="button"
          @click='logout'>
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    goMainPage () {
      this.$router.push('/')
    },
    goHistories () {
      this.$router.push('/histories')
    },
    goCart () {
      this.$router.push('/carts')
    },
    goLogin () {
      this.$router.push('/login')
    },
    goRegister () {
      this.$router.push('/register')
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>

</style>
