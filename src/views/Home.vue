<template>
  <div ref="home" class="home-page">
    <mdb-navbar style="z-index: 1000" color="mdb-color" dark class="row">
      <mdb-navbar-toggler class="col-4">
        <mdb-navbar-nav>
          <mdb-nav-item
          @click.native.prevent="goHome"
          href="#" active>Home</mdb-nav-item>
          <mdb-nav-item
          @click.native.prevent="goToAll"
          href="#" active>All Products</mdb-nav-item>
          <!-- <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>Category</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item
              @click.native.prevent="goHome">Cat1</mdb-dropdown-item>
              <mdb-dropdown-item>cat2</mdb-dropdown-item>
              <mdb-dropdown-item>cat3</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown> -->
                  <!-- <form>
          <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed/>
        </form> -->

        </mdb-navbar-nav>
      </mdb-navbar-toggler>
      <mdb-navbar-toggler class="col-4 justify-content-center">
        <mdb-navbar-brand>
          <img src="" height="50" alt="logo">
        </mdb-navbar-brand>
      </mdb-navbar-toggler>
      <mdb-navbar-toggler class="col-4 justify-content-end">
        <span
        v-if="userDetail.role"
        class="align-items-center d-flex">
          <div>
            <mdb-dropdown
            btn-group
            >
              <mdb-dropdown-toggle size="sm" slot="toggle" color="deep-purple" class="m-0 px-3">
              <v-gravatar
                class="rounded-circle" :email="userDetail.email" :size="30">
              </v-gravatar>
              <span
              class="mx-2 navbar-text white-text">
              {{ userDetail.role }}
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
        color="default" size="md" @click.native="register = true">Sign Up</mdb-btn>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <div
    v-if="this.$route.path === '/'">
    <mdb-carousel class="mdb-color row" style="z-index: 20" :interval="8000" :items="carousel.length" multi controlls slide indicators>
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
          <mdb-card
          v-for="cat in perCol(i)"
          :key="cat.id">
            <mdb-view hover>
              <a href="#!">
                <mdb-card-image :src="`https://source.unsplash.com/random`" :alt="cat.name"></mdb-card-image>
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
            v-model="form.email"
            label="Your email" icon="envelope" type="email" class="mb-5"/>
            <mdb-input
            v-model="form.password"
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
            v-model="form.email"
            label="Your email" icon="envelope" type="email" class="mb-5"/>
            <mdb-input
            v-model="form.password"
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
export default {
  name: 'Home',
  data () {
    return {
      register: false,
      tabs: false,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    userDetail () {
      return this.$store.state.userDetail
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
    goHome () {
      this.$router.push('/', () => {})
    },
    signUp () {
      this.form.avatar = this.form.email
      this.$store.dispatch('register', this.form)
        .then(({ data }) => {
          for (const key in this.form) {
            this.form[key] = ''
          }
          this.$vToastify.success(`Thank you ${data.email} for registering on Amaz-ing. Happy shopping!`)
        })
        .catch(({ response }) => {
          this.$vToastify.error(response.data.error)
        })
    },
    signIn () {
      this.$store.dispatch('login', this.form)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          for (const key in this.form) {
            this.form[key] = ''
          }
          this.$store.commit('setUserDetail', data)
          this.$store.dispatch('fetchCart')
          this.$vToastify.success(`Logged in with ${data.email}`)
        })
        .catch(({ response }) => {
          this.$vToastify.error(response.data.error)
        })
    },
    signOut () {
      this.$vToastify.prompt({
        body: 'Are you sure?',
        answers: { Yes: true, No: false }
      })
        .then(val => {
          if (val) {
            localStorage.clear()
            this.$router.push('/')
            for (const key in this.form) {
              this.form[key] = ''
            }
            this.$store.commit('setUserDetail', this.form)
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
