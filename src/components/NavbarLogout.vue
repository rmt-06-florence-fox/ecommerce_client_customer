<template>
    <div>
        <div class="navbar-custom">
            <div class="logo-navbar">
                <a @click="mainPage" href="#">
                    <img src="../assets/output-onlinepngtools (1).png" alt="logo" width="170px">
                </a>
            </div>
            <div>
                <ul class="center-navbar">
                    <li><a @click="wishlist" href="#">Wishlist</a></li>
                    <li><a @click="cart" href="#">Cart</a></li>
                    <li><a @click="history" href="#">History</a></li>
                </ul>
            </div>
            <div>
                <ul class="right-navbar">
                    <li><button type="button" class="btn btn-danger button2"><a class="text-center" @click="logout" href="#">Logout</a></button></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavbarLogout',
  methods: {
    fetchData () {
      this.$store.dispatch('fetchData')
    },
    logout () {
      localStorage.clear()
      this.$router.push('/')
      this.$store.dispatch('fetchData')
    },
    mainPage () {
      this.$router.push('/mainpage')
    },
    cart () {
      this.$router.push('/cart')
    },
    wishlist () {
      this.$router.push('/maintenance')
    },
    history () {
      this.$router.push('/maintenance')
    }
  }
}
</script>

<style>
.center-navbar {
        display: flex;
        list-style: none;
        justify-content: center;
        height: 90%;
    }

.center-navbar li {
    margin: 10px;
}

.center-navbar a {
    color: black;
    text-decoration: none;
    margin: 10px;
}
</style>
