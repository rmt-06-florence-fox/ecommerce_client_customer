<template>
  <div class="pos-nav">
    <b-navbar toggleable="lg" type="dark" class="navbar-color">
      <b-navbar-brand class="btn" @click.prevent="toHome">L's Bookstore</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click.prevent="toHistory" v-if="isLogin" active>
            <b-icon icon="clock-history"></b-icon>
          </b-nav-item>
          <b-nav-item @click.prevent="toCart" v-if="isLogin" active>
            <b-icon icon="cart-2"></b-icon> {{ carts.length }}
          </b-nav-item>
          <b-nav-item @click.prevent="login" v-if="!isLogin" active>
            <b-icon icon="box-arrow-in-right"></b-icon> Login
          </b-nav-item>
           <b-nav-item @click.prevent="logout" v-if="isLogin" active>
            <b-icon icon="box-arrow-in-left"></b-icon> Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    checkLogin () {
      if (localStorage.getItem('access_token')) this.isLogin = true
      else this.isLogin = false
    },
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$toasted.show('Are you sure ?', {
        action: [
          {
            text: 'Yes',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
              this.$toasted.success('Success logout ! Byeee !!!', { icon: 'check' })
              localStorage.removeItem('access_token')
              this.$store.commit('checkLogin', false)
              if (this.$router.history.current.name !== 'Home') this.$router.push('/')
              this.checkLogin()
            }
          },
          {
            text: 'No',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        ]
      })
    },
    toHome () {
      this.$router.push('/')
    },
    fetchCart () {
      this.$store.dispatch('fetchCarts')
    },
    toCart () {
      this.$router.push('/carts')
    },
    toHistory () {
      this.$router.push('/histories')
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.checkLogin()
    this.fetchCart()
  }
}
</script>

<style>
.navbar-color{
 background-color:#2fd4f5;
}
.pos-nav {
  position: sticky !important;
}
</style>
