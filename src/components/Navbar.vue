<template>
      <div id="navbar">
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <img class="navbar-brand" src="assets/logo.jpg" alt="" width="10%">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="isLogin">
                        <router-link to="/cart" class="nav-link">Cart</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <p class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            More
                        </p>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <router-link class="dropdown-item" v-if="!isLogin" to="/register">Register</router-link>
                        <router-link class="dropdown-item" v-if="!isLogin" to="/login">Login</router-link>
                        <p class="dropdown-item" id="logout" @click="logout" v-if="isLogin">Log Out</p>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
      </nav>
    </div>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: 'Navbar',
  methods: {
    logout () {
      if (localStorage.getItem('access_token')) {
        swal({
          title: 'Logout',
          icon: 'info',
          text: 'Are you sure wanna to logout?',
          buttons: true,
          dangerMode: true
        })
          .then(value => {
            if (value) {
              localStorage.clear()
              this.$store.commit('set_isLogin', false)
              this.$router.push('/login')
              swal('Logout Success', { icon: 'success' })
            }
          })
      } else {
        swal('Error', 'You Not Login')
      }
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
    #navbar{
        margin-bottom: 130px;
    }
    .navbar .container .navbar-brand{
        display: flex;
        align-self: flex-start;
    }
    .dropdown-item{
        cursor: pointer;
    }
    #navbarDropdownMenuLink{
        cursor: pointer;
    }
</style>
