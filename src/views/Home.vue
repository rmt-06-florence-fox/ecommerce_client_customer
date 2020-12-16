<template>
  <div ref="home" class="home-page">
    <mdb-navbar style="z-index: 5000" color="#bf360c deep-orange darken-4" dark class="row">
      <mdb-navbar-toggler class="col-4">
        <mdb-navbar-nav>
          <mdb-nav-item class="pink-text"
          @click.native.prevent="home"
          href="#" active>Home</mdb-nav-item>
          <mdb-nav-item
          @click.native.prevent="goToAll"
          href="#" active>All Products</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
      <mdb-navbar-toggler class="col-4 justify-content-center">
        <mdb-navbar-brand>
        your <img src="../assets/logi.png" height="40" alt="logo"> shop
        </mdb-navbar-brand>
      </mdb-navbar-toggler>
      <mdb-navbar-toggler class="col-4 justify-content-end">
        <span
        v-if="userData.email"
        class="align-items-center d-flex">
          <div>
            <mdb-dropdown
            btn-group
            >
              <mdb-dropdown-toggle size="sm" slot="toggle" color="#ffccbc deep-orange lighten-4" class="m-0 px-3">
              <avatar
                :seed="this.username"
                :colors="['#e9d758', '#297373', '#ff8552', '#e6e6e6', '#39393a']"
                :epsilon="0.1"
                :max-divisions="3"
              />
              <span
              class="mx-2 navbar-text white-text">
              {{ this.email }}
              </span>
              </mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item
                @click.native="signOut">
                  <mdb-icon color="danger" icon="sign-out-alt" /> Logout
                </mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
          </div>
          <a
          @click.prevent="goToCart"
          href="#" class="nav-link navbar-link-2 waves-effect">
            <mdb-badge pill color="light-blue">{{ cart.length }}</mdb-badge>
            <mdb-icon color="white" icon="shopping-cart" />
          </a>
          <a
          @click.prevent="goToTrans"
          href="#" class="nav-link navbar-link-2 waves-effect">
            <mdb-icon color="white" icon="history" />
          </a>
        </span>
        <mdb-btn
        v-else
        color="#ffab00 amber accent-4" size="md" @click.native="register = true">Sign Up</mdb-btn>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <div
    v-if="this.$route.path === '/'">
    <mdb-carousel color="rgba(121, 85, 72, 0.7) rgba-brown-strong" class="mdb-color row" style="z-index: 20" :interval="8000" :items="carousel.length" multi controlls slide indicators>
      <template
      v-for="(banner, i) in carousel"
      :slot="i + 1"
      >
      <img
      :key="banner.id" :src="banner.image_url" :alt="banner.title">
      </template>
    </mdb-carousel>

    <mdb-container class="my-5">
        <mdb-card-group deck
        v-for="i in catRows"
        :key="i"
        class="mt-5 row">
        <!-- {{cat}} -->
          <mdb-card
          v-for="cat in perCol(i)"
          :key="cat.id">
            <mdb-view hover>
              <a href="#!">
                <mdb-card-image :src="`https://source.unsplash.com/1600x900/?${cat.name},product`" :alt="cat.name"></mdb-card-image>
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </a>
            </mdb-view>
            <mdb-card-body>
              <mdb-card-title class="text-capitalize">{{ cat.name }}</mdb-card-title>
              <mdb-btn
              @click="goToCategory(cat.id)"
              color="primary"><mdb-icon icon="shopping-bag"/> Shop Now</mdb-btn>
            </mdb-card-body>
          </mdb-card>
        </mdb-card-group>
    </mdb-container>
    </div>
    <!-- ! Modal Register/Login -->
    <router-view
    v-else
    :toggleModal="toggleModal"/>
    <mdb-container>
      <mdb-modal centered :show="register" @close="register = false">
        <mdb-tab tabs justify class="light-blue darken-3">
          <mdb-tab-item :active="!tabs" @click.native.prevent="tabs = false">
            <mdb-icon icon="user-plus" class="mr-1 text-dark active"/>
            <span class="text-dark">Register</span>
          </mdb-tab-item>
          <mdb-tab-item :active="tabs" @click.native.prevent="tabs = true">
            <mdb-icon icon="user" class="text-dark mr-1"/>
            <span class="text-dark">Login</span>
          </mdb-tab-item>
        </mdb-tab>
          <form
          @submit.prevent="signUp"
          v-if="!tabs">
          <mdb-modal-body class="mx-3 grey-text text-left">
            <mdb-input
            v-model="name"
            label="Your name" icon="user" class="mb-5"/>
            <mdb-input
            v-model="email"
            label="Your email" icon="envelope" type="email" class="mb-5"/>
            <mdb-input
            v-model="password"
            label="Your password" icon="lock" type="password"/>
          </mdb-modal-body>
          <mdb-modal-footer center>
            <mdb-btn @click.native="register = false" color="deep-orange" type="submit">Sign Up</mdb-btn>
          </mdb-modal-footer>
          </form>
          <form
          @submit.prevent="signIn"
          v-else>
          <mdb-modal-body class="mx-3 grey-text text-left">
            <mdb-input
            v-model="email"
            label="Your email" icon="envelope" type="email" class="mb-5"/>
            <mdb-input
            v-model="password"
            label="Your password" icon="lock" type="password"/>
          </mdb-modal-body>
          <mdb-modal-footer center>
            <mdb-btn @click.native="register = false" color="deep-orange" type="submit">Sign In <mdb-icon icon="sign-in-alt" class="ml-1"/></mdb-btn>
          </mdb-modal-footer>
          </form>
    </mdb-modal>
    </mdb-container>
  </div>
</template>

<script>
// import { component } from 'vue/types/umd'
import avatar from 'vue-random-avatar'
export default {
  name: 'Home',
  components: { avatar },
  data () {
    return {
      register: false,
      tabs: false,
      name: '',
      email: '',
      password: '',
      username: 'Byteslicer'
    }
  },
  computed: {
    userData () {
      return this.$store.state.userData
    },
    carousel () {
      return this.$store.state.landscapeBanners
    },
    categories () {
      return this.$store.state.categories
    },
    catRows () {
      return Math.ceil(this.categories.length / 3)
    },
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    home () {
      this.$router.push('/', () => {})
    },
    signUp () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', user)
        .then(({ data }) => {
          this.$vToastify.success('Thank you for registering. Happy shopping!')
        })
        .catch(({ response }) => {
          this.$vToastify.error('error registration,make sure you input email adn password')
        })
    },
    signIn () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', user)
      
    },
    signOut () {
      this.email = ''
      this.$vToastify.prompt({
        body: 'Are you sure?',
        answers: { Yes: true, No: false }
      })
        .then(val => {
          if (val) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('email')
            this.$store.commit('setUserData', this.email)
            this.$store.dispatch('fetchCart')
          }
        })
    },
    perCol (i) {
      const start = i * 3 - 3
      return this.categories.slice(start, start + 3)
    },
    goToCategory (id) {
      this.$router.push(`/categories/${id}`)
    },
    goToAll () {
      this.$router.push('/categories', () => {})
    },
    goToCart () {
      this.$router.push('/cart', () => {})
    },
    goToTrans () {
      this.$router.push('/history', () => {})
    },
    toggleModal () {
      this.register = true
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchAllBanners')
      .then(({ data }) => {
        data = data.filter(el => el.status)
        this.$store.commit('setBanners', data)
        this.$store.dispatch('checkBannersOri')
      })
      .catch(err => console.log(err))
    this.$store.dispatch('fetchAllProducts')
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style scoped>
</style>
