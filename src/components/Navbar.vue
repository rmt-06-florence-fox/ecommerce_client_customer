<template>
  <div>
    <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/822/4281206822_be209932-fad6-4caa-8203-807240681ada.png?cb=1607775908" width="80" height="30" class="d-inline-block align-top" alt="" loading="lazy">
        </a>
        <div class="mx-auto">
            <a @click='changePageHome' type="button" class="a-Home" style=" color: black;">Home</a> |
            <img src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png" width="20" height="20" alt="">
            <a @click="changePageCart" type="button" class="a-Cart" style=" color: black;">Cart</a>
        </div>
        <LoginButton v-if="!access_token" class="btn-login"/>
        <LogoutButton v-if="access_token" class="btn-logout"/>
    </nav>
  </div>
</template>

<script>
import LoginButton from './ButtonLogin'
import LogoutButton from './ButtonLogout'

export default {
  data () {
    return {
      access_token: localStorage.getItem('access_token')
    }
  },
  methods: {
    changePageCart () {
      if (this.access_token) {
        this.$router.push('/cart')
      } else {
        this.$router.push('/login')
      }
    },
    changePageHome () {
      this.$router.push('/')
    }
  },
  components: {
    LoginButton,
    LogoutButton
  }
}
</script>

<style>
    .btn-login {
        margin-right: 10px;
    }
</style>
