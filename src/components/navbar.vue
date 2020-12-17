<template>
  <nav class="navbar navbar-light bg-light shadow fixed-top">
  <div class="container-fluid">
    <img id="logo" @click="mainPage" src="../img/logo.png" alt="">
    <div class="d-flex">
        <div v-if="isLogin">
          <span @click="history">
            <i id="history"  class="fa fa-history fa-2x me-2" aria-hidden="true"></i>
          </span>
          <span @click="cart">
            <i id="cart" class="fas fa-cart-plus fa-2x me-2 text-info" aria-hidden="true"></i>
          </span>
            <button @click="wish" class="btn btn-outline-danger ms-2" type="submit">Whislist</button>
            <button @click="logout" class="btn btn-success ms-2" type="submit">Logout</button>
        </div>
        <div v-else>
            <button @click="login" class="btn btn-outline-success" type="submit">Login</button>
        </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push('/login')
    },
    mainPage () {
      this.$router.push('/')
    },
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    cart () {
      this.$router.push('/carts')
    },
    wish () {
      this.$router.push('/wish')
    },
    history () {
      console.log('clicked')
      this.$router.push('/history')
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
    #navi {
        box-shadow: 0px 5px 10px rgb(168, 167, 167);
    }

    #cart :hover {
        cursor: pointer;
    }
    #history :hover {
        cursor: pointer;
    }
</style>
