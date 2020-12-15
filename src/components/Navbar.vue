<template>
  <nav class="navbar sticky-top navbar-primary shadow bg-light">
    <a @click="goToHome" class="navbar-brand font-weight-bold" href="#"><i class="mr-5 fa fa-home" style="font-size:36px"></i></a>
    <h3 class="mb-0 text-primary">Parabot<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsgnKc6dI3Dh4WACWYmfdSOwexgwPX-8nLA&usqp=CAU" alt="logo" class="logo-img">E-Shop</h3>
    <div>
      <div v-if="loggedIn">
        <button class="btn btn-sm btn-outline-info" data-toggle="modal" data-target="#cartModal"><i class='far fa-heart' style='color:red'></i> <span class="ml-1 badge badge-light">4</span></button> |
        <button class="btn btn-sm btn-outline-success" data-toggle="modal" data-target="#cartModal"><i class=" fa fa-cart-arrow-down"></i> <span class="ml-1 badge badge-light">4</span></button> |
        <button @click="logout" class="btn btn-sm btn-outline-danger rounded-pill font-weight-bold text-dark" type="button">Logout</button>
      </div>
      <div v-else>
        <button @click="login" class="btn btn-sm btn-outline-success font-weight-bold text-dark" type="button">Login</button> |
        <button @click="register" class="btn btn-sm btn-outline-warning rounded-pill font-weight-bold text-dark" type="button">Register</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      loggedIn: false
    }
  },
  methods: {
    goToHome () {
      this.$router.push('/')
    },
    login () {
      this.$router.push('/login')
    },
    register () {
      this.$router.push('/register')
    },
    logout () {
      localStorage.removeItem('access_token')
      this.isLogin()
    },
    isLogin () {
      if (localStorage.access_token) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    }
  },
  created () {
    this.isLogin()
  }
}
</script>

<style>

</style>
