<template>
  <nav class="navbar sticky-top navbar-primary shadow bg-light">
    <a @click="goToHome" class="navbar-brand font-weight-bold" href="#"><i class="mr-5 fa fa-home" style="font-size:36px"></i></a>
    <h3 class="mb-0 text-primary">Parabot<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsgnKc6dI3Dh4WACWYmfdSOwexgwPX-8nLA&usqp=CAU" alt="logo" class="logo-img">E-Shop</h3>
    <div>
      <div v-if="loggedIn">
        <!-- Button Wishlist -->
        <button @click="goToWishlists" class="btn btn-sm btn-outline-info" data-toggle="modal" data-target="#cartModal"><i class='far fa-heart' style='color:red'></i> <span class="ml-1 badge badge-light">{{wishlistsCount}}</span></button> |
        <!-- Button Cart -->
        <button @click="goToCarts" class="btn btn-sm btn-outline-success" data-toggle="modal" data-target="#cartModal"><i class=" fa fa-cart-arrow-down"></i> <span class="ml-1 badge badge-light">{{cartsCount}}</span></button> |
        <!-- Button Logout -->
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
import Swal from 'sweetalert2'

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
      Swal.fire({
        title: 'Are you sure?',
        text: 'You can back any time to visit Us',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, i'm leaving~"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('access_token')
          this.$router.push('/')
          Swal.fire({
            icon: 'success',
            title: 'Good Bye',
            text: 'Thank you for your visit, have a nice day'
          })
          this.isLogin()
        }
      })
    },
    isLogin () {
      if (localStorage.access_token) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    },
    goToWishlists () {
      this.$router.push('/wishlists')
    },
    goToCarts () {
      this.$router.push('/carts')
    },
    getCarts () {
      this.$store.dispatch('fetchCarts')
    },
    getWishlists () {
      this.$store.dispatch('fetchWishlists')
    }
  },
  computed: {
    cartsCount () {
      return this.$store.state.cartsCount
    },
    wishlistsCount () {
      return this.$store.state.wishlistsCount
    }
  },
  created () {
    this.isLogin()
    this.getCarts()
    this.getWishlists()
  }
}
</script>

<style>

</style>
