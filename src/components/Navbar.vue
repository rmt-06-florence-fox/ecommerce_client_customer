<template>
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="../assets/Bukatelapak.com.svg" width="30" height="30" class="d-inline-block align-top" alt="">
          Bukatelapak.com
        </a>
    <div class="d-flex">
        <div v-if="!statusLogin">
          <a class="navbar-cart" href="/carts">
            <img src="../assets/carts.png" width="30" height="30" class="d-inline-block align-top" alt="">
          </a>
          <button type="button" class="btn btn-light" @click="toLogin">login</button>
        </div>
        <div v-else>
          <a class="navbar-cart" href="/carts">
            <img src="../assets/carts.png" width="30" height="30" class="d-inline-block align-top" alt="">
          </a>
         <button type="button" class="btn btn-light" @click.prevent="logout">logout</button>
        </div>
    </div>
  </div>
</nav>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  pageName: 'Navbar',
  data () {
    return {
      loginStatus: ''
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
      this.$store.commit('checkLogin', false)
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
        title: 'Sign out successfully'
      })
    },
    toLogin () {
      this.$router.push('/login')
    }
  },
  computed: {
    statusLogin () {
      return this.$store.state.statusLogin
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    /* background-color: rgb(202, 229, 252); */
}
a {
    text-decoration: none;
    color: black;
}
</style>
