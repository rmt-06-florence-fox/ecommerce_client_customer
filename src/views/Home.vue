<template>
  <div class="home">
    <div class="main-flex">
      <div class="col-2 sidenav uk-card-secondary uk-animation-slide-left">
        <div class="content-nav uk-card-secondary">
          <!-- <span uk-icon="user"></span><span>: <Profile /></span>
          <hr> -->
          <Profile />
          <div class="category-title mt-4">
             <h6 class="title category mt-3">CATEGORIES</h6>
          </div>
          <div class="categories-list">
            <Category
              v-for="category in categories"
              :key="category.id"
              :category="category"
            />
          </div>
        </div>
        <div class="cart-button" v-if="logged">
          <span id="cart-button-text">{{ amountItems }} items on cart</span>
          <router-link to="/cart"><button class="cart btn btn-primary mt-3"><span uk-icon="icon: cart"></span><span> Cart</span></button></router-link>
        </div>
        <br>
        <div class="wishlist-button" v-if="logged">
          <router-link to="/wishlist"><button class="wishlist btn btn-primary"><span uk-icon="icon: heart"></span><span> Wishlist</span></button></router-link>
        </div>
        <div class="history-button" v-if="logged">
          <router-link to="/history"><button class="history btn btn-primary"><span uk-icon="icon: history"></span><span> History</span></button></router-link>
        </div>
      </div>
      <AllProducts v-if="!params && $route.name !== 'Wishlist' && $route.name !== 'Cart' && $route.name !== 'History'" />
      <router-view v-else-if="params || $route.name === 'Wishlist' || $route.name === 'Cart' || $route.name === 'History'"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AllProducts from '../components/AllProducts'
import Profile from '../components/Profile'
import Category from '../components/Category'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
    toWishlists () {
      this.$router.push('/wishlist')
    }
  },
  components: {
    Category, AllProducts, Profile
  },
  computed: {
    amountItems () {
      let count = 0
      this.$store.state.cart.forEach(element => {
        count += element.amount
      })
      return count
    },
    categories () {
      return this.$store.state.categories
    },
    logged () {
      return this.$store.state.logged
    },
    params () {
      return this.$route.params.category
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style scoped>

.uk-card-secondary{
  background-color: #4b4b4b;
  /* background-size: 500%; */
}

#card-button-text {
  color: white !important;
}

.cart-button {
  margin-top: 8rem;
  font-family: 'Alfa Slab One', cursive;
}

.content {
  margin-top: 12px;
  margin-left: 200px;
}

.history {
  padding-left: 17px !important;
  padding-right: 17px;
}

.history-button {
  margin-top: 25px;
  font-family: 'Alfa Slab One', cursive;
}

.uk-button {
  color: black;
}

.content-nav h6 {
  font-family: 'Alfa Slab One', cursive;
  color: white;
}

.main-flex {
  display: flex;
}

.btn-primary {
  background-color: #00b894;
}

.btn-primary:hover {
  background-color: #55efc4;
}

.sidenav {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 8rem;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}

.wishlist-button {
  font-family: 'Alfa Slab One', cursive;
  padding: 0;
}
</style>
