<template>
  <nav class="navbar navbar-light fixed-top" style="background-color: #8c8b9b4a; color: #E2B91B; height: 7%">
    <div class="container-fluid">
      <h3>
        Br<i class="fas fa-shoe-prints"></i>.Shoes
      </h3>
      <form class="form-inline">
        <i class="fas fa-shopping-cart" id="cart" style="font-size:28px" v-if="cartNotif <= 0" @click="goCart()"></i>
        <i class="fa fa-cart-plus" style="font-size:28px;color:red" v-if="cartNotif.length > 0" @click="goCart()"></i>
        <b-tooltip target="cart" variant="secondary">cart</b-tooltip>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="btn-signIn"  style="border-radius: 25px; margin-left: 12px" v-if="!access_token && !isLogin" @click="goLogin()"><i class="fas fa-sign-in-alt fa-sm"></i></button>
        <b-tooltip target="btn-signIn" variant="success">sign in</b-tooltip>
        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" id="btn-signOut" style="border-radius: 25px; margin-left: 10px" v-if="isLogin || access_token" @click="logout()"><i class="fas fa-sign-out-alt fa-sm"></i></button>
        <b-tooltip target="btn-signOut" variant="danger">sign out</b-tooltip>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    goLogin () {
      this.$router.push('/login')
    },
    goCart () {
      const token = localStorage.getItem('access_token')
      if (token) {
        this.$router.push('/carts')
      } else {
        this.$snotify.error({
          Please: 'Login or Register First'
        })
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    access_token () {
      return this.$store.state.access_token.access_token
    },
    cartNotif () {
      return this.$store.state.cartNotif
    }
  }
}
</script>

<style>

</style>
