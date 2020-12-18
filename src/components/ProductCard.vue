<template>
  <div class="col mt-2">
    <div class="card">
      <img :src="product.image_url" class="card-img-top" alt="product.name">
      <div class="card-body">
        <img v-if="wishList.includes(product.id) && isAuthenticated" @click="deleteWishListFromProduct(product.id)" src="../assets/star.svg" class="wishlist-icon">
        <img v-else-if="!wishList.includes(product.id) && isAuthenticated" @click="addWishList(product.id)" src="../assets/empty-star.svg" class="wishlist-icon">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Category: {{ product.Category.name }}</p>
        <p class="card-text border-secondary border border-5 border-left-0 border-right-0">{{ formatRupiah(product.price) }}</p>
        <p class="card-text text-black-50">stock: {{ product.stock }}</p>
        <a href="" v-if="product.stock" @click.prevent="addCart(product.id)" class="btn btn-success">Add to Cart</a>
        <a href="" v-if="!product.stock" @click.prevent="" class="btn btn-warning">Out of Stock</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  data () {
    return {
    }
  },
  methods: {
    formatRupiah (price) {
      return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`
    },
    addCart (ProductId) {
      if (this.isAuthenticated) {
        this.$store.dispatch('addCart', ProductId)
          .then(({ data }) => {
            // Swal.fire (
            //     "Added",
            //     "A new category has been added.",
            //     "success"
            // )
            this.$store.dispatch('fetchProducts')
          })
          .catch((err) => {
            console.log(err)
            this.messages = err.response.data.messages
            this.error = true
            // this.$nextTick(()=> {
            //   console.log(this.$refs.error)
            //    this.$refs.error[0].$el.scrollIntoView();
            // });
          })
      } else {
        this.$router.push('/login')
      }
    },
    addWishList (ProductId) {
      this.$store.dispatch('addWishlist', ProductId)
        .then(({ data }) => {
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          this.$store.dispatch('fetchWishlists')
          this.$store.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
          this.messages = err.response.data.messages
          this.error = true
          // this.$nextTick(()=> {
          //   console.log(this.$refs.error)
          //    this.$refs.error[0].$el.scrollIntoView();
          // });
        })
    },
    deleteWishlistFromProduct (ProductId) {
      this.$store.dispatch('deleteWishlistFromProduct', ProductId)
        .then(({ data }) => {
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          this.$store.dispatch('fetchWishlists')
          this.$store.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
          this.message = err.response.data.message
          this.error = true
          // this.$nextTick(()=> {
          //    this.$refs.error.$el.scrollIntoView();
          // });
        })
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    }
  }
}
</script>

<style>
   .wishlist-icon {
  width: 20%;
  position: relative;
  bottom: 0.6rem;
  font-size: 1rem;
  cursor:pointer;
  }
</style>
