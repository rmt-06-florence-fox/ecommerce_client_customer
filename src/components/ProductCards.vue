<template>
  <div class="card col-3 m-2 border-0 shadow" style="width: 18rem;">
    <img :src="product.image_url" class="card-img-top mt-3" alt="...">
    <div class="card-body text-center">
        <small>{{ product.name }}</small><br>
        <small>Available Stock: {{ product.stock }} unit</small><br>
        <small>Price: Rp {{ convertPrice }}</small><br>
        <a class="btn btn-primary" v-if="isLogin" @click="addCart(product)">Add to cart</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCards',
  props: ['product'],
  data () {
    return {
      isLogin: false,
      isSame: false
    }
  },
  methods: {
    fetchCarts () {
      this.$store.dispatch('fetchCarts')
    },
    addCart (data) {
      this.isSame = false
      new Promise((resolve, reject) => {
        this.fetchCarts()
        if (this.listCarts) {
          resolve(this.listCarts)
        } else {
          reject(console.log('error'))
        }
      })
        .then(response => {
          console.log(response)
          for (let i = 0; i < response.length; i++) {
            if (response[i].ProductId === data.id) {
              this.isSame = true
              console.log('access this')
              if (response[i].quantity === data.stock) {
                console.log('you can not order more than available stock')
              } else {
                this.$store.dispatch('patchCart', data.id)
              }
            }
          }
          setTimeout(() => {
            if (this.isSame === false) {
              this.$store.dispatch('addCart', data.id)
            }
          }, 1000)
          this.fetchCarts()
        })
        .catch(e => console.log(e))
    },
    checkLogin () {
      if (localStorage.getItem('access_token')) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    }
  },
  computed: {
    listCarts () {
      return this.$store.state.listCarts
    },
    convertPrice () {
      return this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  created () {
    this.checkLogin()
    this.fetchCarts()
  }
}
</script>

<style>
.card-img-top {
    width: 100%;
    object-fit: cover;
}
</style>
