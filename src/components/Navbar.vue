<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow justify-content-between">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#" @click="home">Mr Bee Ecommerce</a>
    <div class="col-md-6 mt-0 mb-0 px-0" >
    <a class="btn btn-secondary text-white col-md-4 col-lg-1 px-2 mr-1" href="#" @click="products">Products</a>
    <a class="btn btn-secondary text-white col-md-4 col-lg-1 px-2" href="#" @click="carts">Carts</a>
    </div>
     <div v-if="currentUser" class="text-white">
        {{ currentUser }}
        <button text class="mr-2 btn btn-danger" @click="signout">Sign Out</button>
      </div>
      <div v-else>
        <button text class="mr-2 btn btn-primary" @click="signin">Sign In</button>
        <button text class="mr-2 btn btn-success" @click="signup">Sign Up</button>
      </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapState([
      'currentUser'
    ])
  },
  methods: {
    home () {
      this.$router.push('/')
    },
    signout () {
      localStorage.clear()
      this.$router.push('/signin')
    },
    signin () {
      this.$router.push('/signin')
    },
    signup () {
      this.$router.push('/signup')
    },
    products () {
      this.$router.push('/home')
    },
    carts () {
      this.$router.push('/carts')
    }
  }
}
</script>

<style>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Navbar
 */

.navbar-brand {
  width: 100%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
