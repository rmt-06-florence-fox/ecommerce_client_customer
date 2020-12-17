<template>
  <nav class="navbar is-fixed-top is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item pr-0">
          <router-link class="navbar-item title is-4 is-primary" to="/">The Dhil-Commerce!</router-link>
        </div>
        <a role="button" @click.prevent= "active" :class= "class1" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" :class= "class2">
        <div class="navbar-start">
        </div>

        <div class="navbar-end">
          <div class="navbar-item" v-if="isLogin">
            <div class="buttons">
              <router-link class="button is-large is-light" to="/yourWishlist">
                <span class="icon is-large">
                  <i class="fas fa-heart"></i>
                </span>
              </router-link>
              <router-link class="button is-large is-light" to="/yourCart">
                <span class="icon is-large">
                  <i class="fas fa-shopping-cart"></i>
                </span>
              </router-link>
              <router-link class="button is-large is-light" to="/yourTransaction">
                <span class="icon is-large">
                  <i class="fas fa-cash-register"></i>
                </span>
              </router-link>
            </div>
          </div>
          <div class="navbar-item">
            <div class="buttons">
              <button class="navbar-item button is-danger is-outlined" v-if="isLogin" @click.prevent="logout">logout</button>
              <router-link class="navbar-item button is-info is-outlined" v-if="!isLogin" to="/register">Register</router-link>
              <router-link class="navbar-item button is-link is-outlined" v-if="!isLogin" to="/login">login</router-link>
            </div>
          </div>
        </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      class1: 'navbar-burger burger',
      class2: 'navbar-menu'
    }
  },
  methods: {
    active () {
      if (this.class1 === 'navbar-burger burger') {
        this.class1 = 'navbar-burger burger is-active'
        this.class2 = 'navbar-menu is-active'
      } else {
        this.class1 = 'navbar-burger burger'
        this.class2 = 'navbar-menu'
      }
    },
    logout () {
      this.$store.commit('CHANGE_IS_LOGIN', false)
      localStorage.clear()
      // this.$router.push('/login')
      // this.$swal.fire({
      //   title: 'Are you sure?',
      //   text: "After this, you won't allowed to access this site!",
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#d33',
      //   confirmButtonText: 'Yes'
      // }).then((result) => {
      //   if (result.isConfirmed) {
      // this.$swal.fire(
      //   'logging out',
      //   'Thank you admin, have a nice day',
      //   'success'
      // )
      //     this.$store.commit('CHANGE_IS_LOGIN', false)
      //     localStorage.clear()
      //     this.$router.push('/login')
      //   }
      // })
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('CHANGE_IS_LOGIN', true)
    } else {
      this.$store.commit('CHANGE_IS_LOGIN', false)
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

</style>
