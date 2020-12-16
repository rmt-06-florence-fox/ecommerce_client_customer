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
                    <li class="nav-item active">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/">List Barang</a>
                    </li>
                    <li class="nav-item dropdown">
                        <p class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            More
                        </p>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <router-link to="/register" class="dropdown-item">Register</router-link>
                        <router-link to="/login" class="dropdown-item">Login</router-link>
                        <p class="dropdown-item" id="logout" @click="logout">Log Out</p>
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
            this.$router.push('/login')
            swal('Logout Success', { icon: 'success' })
          }
        })
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
    #logout{
        cursor: pointer;
    }
    #navbarDropdownMenuLink{
        cursor: pointer;
    }
</style>
