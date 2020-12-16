<template>
<nav class="cust-navbar shadow">
    <div class="right-item">
      <a @click="home" href="#">Home</a>
      </div>
    <div class="left-item">
        <a @click="cart" class="fa fa-shopping-cart" href="#" style="font-size:36px"></a>
        <button
        v-if="isLogin == 'true'"
        @click="logout" class="btn btn-danger"
        >Logout</button>
        <button
        v-else
        @click="loginForm"
        class="btn btn-primary"
        >login</button>
    </div>
</nav>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: localStorage.getItem('isLogin')
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    loginForm () {
      this.$router.push('/login')
    },
    cart () {
      this.$router.push('/cart')
    },
    home () {
      this.$router.push('/home')
    }
  }

}
</script>

<style>

</style>
