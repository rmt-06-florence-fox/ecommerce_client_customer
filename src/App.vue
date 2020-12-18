<template>
  <div>
    <b-container fluid style="text-align:center;background-image:url('https://wallpaperaccess.com/full/1358473.jpg')">
      <img
          class="d-inline-block align-top"
          src="@/assets/logo1.png"
          style="width: 150px;margin:0 auto;"
          alt="logo"
        />
    </b-container>
    <b-navbar
      sticky
      toggleable="lg"
      type="light"
      variant="light"
      class="navbar-horizontal shadow"
    >
      <b-navbar-brand>
        <img
          class="d-inline-block align-top"
          src="@/assets/logo.png"
          style="width: 80px"
          alt="logo"
        />
      </b-navbar-brand>
      <b-navbar-nav id="navbar" class="mr-auto">
        <b-nav-item><a><router-link to="/"><h4>JWAL Store</h4></router-link></a></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-nav-item v-if="loginStatus" @click="toCart" class="btn btn-light mx-3"><i class="fas fa-shopping-cart"></i>Cart</b-nav-item>

          <b-nav-item-dropdown right v-if="loginStatus">
            <template v-slot:button-content>
              <span>
                <i class="fas fa-user"></i>Account</span
              >
            </template>
            <b-dropdown-item><button class="btn" @click="toHistory">History</button></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item><button class="btn" @click="logout">Logout</button></b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-else right>
            <template v-slot:button-content>
              <span>
                <i class="fas fa-user"></i> Login / Register</span
              >
            </template>
            <b-dropdown-item><router-link to="/login">Login</router-link></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item><router-link to="/register">Register</router-link></b-dropdown-item>
          </b-nav-item-dropdown>

        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      status: ''
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.loginStatus
    },
    token () {
      return localStorage.getItem('access_token')
    }
  },
  methods: {
    toCart () {
      this.$router.push({ name: 'Cart' })
    },
    logout () {
      this.$store.commit('setStatus', false)
      localStorage.clear()
      this.$swal(
        'Success!',
        'Logout Success',
        'success' // success,error,warning
      )
      this.$store.commit('setStatus', false)
      this.$router.push({ name: 'Login' })
    },
    toHistory () {
      this.$router.push({ name: 'History' })
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h4{
  color:black;
  text-decoration: none;
}
</style>
