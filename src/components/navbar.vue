<template>
    <div class="navbar" id="nav">
      <div class="left-navbar">
        <router-link to="/"><img src="../assets/logo.png"></router-link>
      </div>
      <div class="right-navbar">
        <div v-if="getLoginStatus || loginStatus" class="wishlist">
          <span class="tooltiptext">Wishlist</span>
          <i @click="moveToWishlist" class="far fa-heart"></i>
        </div>
        <div v-if="getLoginStatus || loginStatus" class="cart">
          <span class="tooltiptext">Cart</span>
          <i @click="moveToCart" class="cart fas fa-shopping-cart"></i>
        </div>
        <div v-if="getLoginStatus || loginStatus" class="history">
          <span class="tooltiptext">History</span>
          <i @click="transactionHistory" class="history fas fa-history"></i>
        </div>
        <div v-if="getLoginStatus || loginStatus" class="logout">
        <span class="tooltiptext">Logout</span>
        <i class="logout fas fa-sign-out-alt" @click="logout"></i>

        </div>
        <button v-if="!loginStatus && !getLoginStatus" class="btn-danger mr-2" @click="moveToRegister">SignUp</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      loginStatus: localStorage.access_token
    }
  },
  methods: {
    logout () {
      this.$store.commit('setLoginStatusOff')
      this.loginStatus = false
      localStorage.clear()
      this.$router.push('/login')
    },
    moveToRegister () {
      this.$router.push('/register')
    },
    moveToCart () {
      this.$router.push('/cart')
    },
    transactionHistory () {
      this.$router.push('/transactionHistory')
    },
    moveToWishlist () {
      this.$router.push('/wishlist')
    }
  },
  computed: {
    getLoginStatus () {
      return this.$store.state.loginStatus
    }
  }
}
</script>

<style>
.navbar {
    display: flex;
    background-color:#f1d4ff;
    height: 8vw;
    align-content: center;
}
.navbar img {
  width: 5vw;
}
.right-navbar {
  display: flex;
}
.fas,
.far {
  margin-right: 1rem;
  font-size: 2rem;
}
.wishlist .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  top: 7vw;
  right: 10vw;
  z-index: 1;
}
.wishlist:hover .tooltiptext {
  visibility: visible;
}
.cart .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  right: 7vw;
  top: 7vw;
}
.cart:hover .tooltiptext {
  visibility: visible;
}
.history .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  top: 7vw;
  right: 4vw;
  z-index: 1;
}
.history:hover .tooltiptext {
  visibility: visible;
}
.logout .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  top: 7vw;
  right: 1vw;
  z-index: 1;
}
.logout:hover .tooltiptext {
  visibility: visible;
}
</style>
