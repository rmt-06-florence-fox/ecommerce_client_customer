<template>
  <nav class="navbar navbar-light justify-content-between" style="background-color: #B8F0F0;">
      <div style="padding-left: 20px;">
        <router-link class="navbar-brand" to="/">KucingKu.com</router-link>
      </div>
      <div style="padding-right: 10px">
        <router-link v-if="isLogin" class="btn m-1" style="background-color: #68dede;" to="/carts"><i class="fa fa-shopping-cart"></i> Cart</router-link>
        <button v-if="isLogin" class="btn m-1" style="background-color: #68dede;" ><i class="fa fa-history"></i> History</button>
        <router-link v-if="!isLogin" class="btn m-1" style="background-color: #68dede;" to="/login">Login</router-link>
        <button v-if="isLogin" class="btn btn-danger m-1" @click="logout">Logout</button>
      </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.dispatch('checkLogin')
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Signed out'
      })
      this.$router.push('/')
    }
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  created: function () {
    this.$store.dispatch('checkLogin')
  }
}
</script>

<style>

</style>
