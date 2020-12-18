<template>
 <nav class="navbar sticky-top navbar-light shadow bg-light">
    <button class="btn btn-sm btn-outline-primary rounded-pill font-weight-bold text-dark mr-2"
      type="button"
      @click='goMainPage'>
      <i class="fas fa-book"></i>
    </button>
    <div class="dropdown mr-auto">
      <button class="btn btn-sm btn-outline-primary rounded-pill font-weight-bold text-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <FilterList
          v-for="data in listCategories"
          :key="data.id"
          :data="data"
        ></FilterList>
      </div>
    </div>
    <a class="navbar-brand font-weight-bold mr-auto">Welcome to my humble bookstore</a>
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
import FilterList from '../components/FilterList'
export default {
  name: 'Navbar',
  components: {
    FilterList
  },
  methods: {
    goMainPage () {
      if (this.$route.path === '/') {
        this.$store.commit('setFilter', '')
      } else {
        this.$router.push('/')
      }
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
    },
    listCategories () {
      return this.$store.state.listCategories
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>

</style>
