<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-color">
      <b-navbar-brand>L's Bookstore</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="isLogin" active>
            <b-icon icon="cart-2"></b-icon>
          </b-nav-item>
          <b-nav-item @click.prevent="login" v-if="!isLogin" active>
            <b-icon icon="box-arrow-in-right"></b-icon> Login
          </b-nav-item>
           <b-nav-item @click.prevent="logout" v-if="isLogin" active>
            <b-icon icon="box-arrow-in-left"></b-icon> Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    checkLogin () {
      if (localStorage.getItem('access_token')) this.isLogin = true
      else this.isLogin = false
    },
    login () {
      this.$router.push('/login')
    },
    logout () {
      localStorage.removeItem('access_token')
      this.checkLogin()
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>

<style>
.navbar-color{
 background-color:#2fd4f5;
}
</style>
