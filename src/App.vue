<template>
  <div id="app" class="uk-background">
    <div id="nav" class="uk-background-default uk-light uk-panel">
      <router-link class="nav-links" to="/"><img class="logob" alt="Hack logo" src="./assets/neulogo.png" width="200px"><br></router-link>
      <router-link v-if="!logged" class="nav-links" to="/landing"><span uk-icon="icon: sign-in; ratio: 2.5"></span></router-link>
      <a href="#" v-else-if="logged" class="nav-links logout" @click.prevent="logout"><span uk-icon="icon: sign-out; ratio: 2.5"></span></a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'App',
  methods: {
    logout () {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: 'Logout successfully'
            })
            localStorage.clear()
            this.$store.commit('login', false)
            this.$store.commit('insertWishlist', '')
          }
        })
    }
  },
  computed: {
    logged () {
      return this.$store.state.logged
    }
  },
  created () {
    this.$store.dispatch('getCategories')
    if (localStorage.getItem('token')) {
      this.$store.commit('login', true)
      this.$store.dispatch('getWishlist')
      this.$store.dispatch('getCart')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  font-family: 'Alfa Slab One', cursive;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

#nav a {
  text-decoration: none;
  color:black;
  margin: 0px 20px;
}

#nav a:hover {
  color: #00b894;
  transition: 300ms;
}

.logout:hover {
  color: #00b894 !important;
}
</style>
