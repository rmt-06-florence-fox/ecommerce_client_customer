<template>
    <div class="navbar" id="nav">
      <div class="left-navbar">
        <h5>CMS</h5>
      </div>
      <div class="center-navbar">
        <router-link to="/home">Home</router-link>
      </div>
      <div class="right-navbar">
        <button class="btn-danger mr-2" @click="moveToRegister">SignUp</button>
        <button class="btn-danger mr-2" @click="logout">logout</button>
        <button class="btn-primary" @click="moveToCart">cart </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout () {
      this.$router.push('/login')
      localStorage.clear()
    },
    moveToRegister () {
      this.$router.push('/register')
    },
    moveToCart () {
      this.$router.push('/cart')
    }
  }
}
</script>

<style>
.navbar {
    display: flex;
}
</style>
