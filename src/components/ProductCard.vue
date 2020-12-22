<template>
  <div class="col mt-2">
    <div class="card">
      <img :src="product.image_url" class="card-img-top" :alt="product.name">
      <div class="card-body">
        <img v-if="arrWishlistProductId.includes(product.id) && isAuthenticated" @click="deleteWishlistFromProduct(product.id)" src="../assets/star.svg" class="wishlist-icon">
        <img v-else-if="!arrWishlistProductId.includes(product.id) && isAuthenticated" @click="addWishList(product.id)" src="../assets/empty-star.svg" class="wishlist-icon">
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
import Swal from 'sweetalert2'
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
            Swal.fire({
              toast: true,
              icon: 'success',
              title: 'Added to your cart',
              animation: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            this.$store.dispatch('fetchProducts')
            this.$store.dispatch('fetchCarts')
          })
          .catch((err) => {
            console.log(err)
            // this.messages = err.response.data.messages
            // this.error = true
            // this.$nextTick(()=> {
            //    this.$refs.error[0].$el.scrollIntoView();
            // });
            Swal.fire({
              toast: true,
              icon: 'error',
              title: err.response.data.message,
              animation: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
          })
      } else {
        Swal.fire(
          'Sign In',
          'Please sign in first before adding a product to your cart.',
          'warning'
        )
        this.$router.push('/login')
      }
    },
    addWishList (ProductId) {
      this.$store.dispatch('addWishlist', ProductId)
        .then(({ data }) => {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Added to your wishlist',
            animation: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          this.$store.dispatch('fetchWishlists')
          this.$store.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
          // this.message = err.response.data.message
          // this.error = true
          // this.$nextTick(()=> {
          //   console.log(this.$refs.error)
          //    this.$refs.error[0].$el.scrollIntoView();
          // });
          Swal.fire({
            toast: true,
            icon: 'error',
            title: err.response.data.message,
            animation: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
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
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Removed from your wishlist',
            animation: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
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
    },
    arrWishlistProductId () {
      return this.$store.state.arrWishlistProductId
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
