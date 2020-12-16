<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <router-link to="/" class="navbar-brand"><h2><strong>BlaBla.com</strong></h2></router-link>
    <!-- <a class="navbar-brand" href="#">Bleh Bleh</a> -->
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li>
            <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li></li>
      </ul>
      <ul class="navbar-nav ml-auto">
          <li class="d-flex align-items-center">
              <a href="" @click.prevent="cart"><i class="fa fa-cart-arrow-down" style="font-size:24px"></i></a>
          </li>
          <li class="ml-5 d-flex align-items-center">
              <a href="" @click.prevent="historyCust"><i class="fa fa-history" style="font-size:24px"></i></a>
          </li>
          <li class="ml-5" v-if="isLogin">
            <!-- <a href="#" @click="logout" style="text-decoration: none"
           ><GoogleLogin
              :params="params"
              :logoutButton="true"
              class="nav-link btn btn-danger p-1 w"
              style="color: black"
              ><i class="fa fa-sign-out" style="font-size:24px; color:red">Logout</i></GoogleLogin
            ><span class="sr-only">(current)</span></a> -->
              <a href="" @click.prevent="logout"><GoogleLogin
              :params="params"
              :logoutButton="true"
              class="nav-link btn btn-danger p-1 w"
              style="color: black"
              ><i class="fa fa-sign-out" style="font-size:24px; color:white">Logout</i></GoogleLogin
            ></a>
          </li>
           <li class="ml-5" v-if="!isLogin">
              <a href="" @click.prevent="login"><i class="fa fa-sign-in" style="font-size:24px"> Login</i></a>
          </li>
      </ul>
      <!-- <ul class="navbar-nav ml-auto">
        <li>
          <a href="#" @click="logout" style="text-decoration: none"
           ><GoogleLogin
              :params="params"
              :logoutButton="true"
              class="nav-link btn btn-danger p-1 w"
              style="color: black"
              >Logout</GoogleLogin
            ><span class="sr-only">(current)</span></a>
        </li>
      </ul> -->
    </div>
  </nav>
</template>

<script>
import GoogleLogin from 'vue-google-login'
export default {
  name: 'Navbar',
  components: {
    GoogleLogin
  },
  data () {
    return {
      // isLogin: false
      params: {
        client_id:
            '1048832564850-fpn38itn9av9bci2rfeoedhnih2sqnsi.apps.googleusercontent.com'
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    cart () {
      if (this.isLogin) {
        this.$router.push('/cart')
      }
    },
    historyCust () {
      if (this.isLogin) {
        this.$router.push('/history')
      }
    },
    logout () {
      this.$store.dispatch('logout')
      this.$store.commit('setIsLogin', false)
    }
  },
  created () {
  }
}
</script>

<style>
</style>
