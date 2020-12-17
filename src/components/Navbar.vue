<template>
  <div class="navbar fixed0-top navbar-light bg-light">
    <div class="left-navbar">
      <router-link class="navbar-brand" to='/'> SHOP-DAY </router-link>
    </div>
    <div class="right-navbar ml-4">
    <router-link id="card-link" to="/carts">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3 mr-4" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
    </router-link>
      <button v-if="!access_token" v-bind:class="styleLogin" @click="loginBtnClick"> Login </button>
      <button v-else id="btn-logout" class="navbar-item btn btn-outline-danger ml-3" @click="logoutBtn"> Logout </button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Navbar',
  data () {
    return {
      access_token: localStorage.getItem('access_token'),
      loginBtn: ''
    }
  },
  methods: {
    logoutBtn () {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logout Success',
        showConfirmButton: false,
        timer: 1500
      })
      this.$router.push('/login')
      localStorage.clear()
    },
    loginBtnClick () {
      this.$router.push('/login')
    }
  },
  computed: {
    styleLogin () {
      return this.$store.state.loginBtn
    }
  },
  created () {
    this.$store.commit('setBtnLogin')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-navbar{
    color: black;
    margin-right: 10px;
  }
  .bi {
    /* margin-right: 25px; */
    color: black;
  }
  .navbar {
    height: 80px;
    padding-top: 3px;
    padding-bottom: px;
    color: black;

  }
  .navbar-brand{
    margin-left: 15px;
    font-family: 'Kaushan Script', cursive;

  }
  /* .navbar-brand:hover{
    color: rgb(214, 214, 243);
  } */
  /* #btn-logout{
    color: black;
  } */
</style>
