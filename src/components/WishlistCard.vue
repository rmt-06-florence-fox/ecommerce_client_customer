<template>
  <div class="col mt-2">
    <div class="card">
      <img :src="wishlist.Product.image_url" class="card-img-top" :alt="wishlist.Product.name">
      <div class="card-body">
        <h5 class="card-title">{{ wishlist.Product.name }}</h5>
        <p class="card-text">Category: {{ wishlist.Product.Category.name }}</p>
         <p class="card-text border-secondary border border-5 border-left-0 border-right-0">{{ formatRupiah(wishlist.Product.price) }}</p>
        <p class="card-text text-black-50">stock: {{ wishlist.Product.stock }}</p>
        <div class="d-flex flex-column">
          <a href="" v-if="wishlist.Product.stock" @click.prevent="addCart(wishlist.Product.id, wishlist.id)" class="btn btn-success">Add to Cart</a>
          <a href="" v-if="!wishlist.Product.stock" @click.prevent="" class="btn btn-warning">Out of Stock</a>
          <a href="" @click.prevent="deleteWishlist(wishlist.id)" class="btn-sm btn-danger mt-2">Remove from Wishlist</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'WishlistCard',
  props: ['wishlist'],
  data () {
    return {
    }
  },
  methods: {
    formatRupiah (price) {
      return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`
    },
    addCart (ProductId, WishlistId) {
      this.$store.dispatch('addCart', ProductId)
        .then(({ data }) => {
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
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
          return this.$store.dispatch('deleteWishlist', WishlistId)
        })
        .then(({ data }) => {
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          this.$store.dispatch('fetchWishlists')
          this.$store.dispatch('fetchCarts')
          this.$store.dispatch('fetchProducts')
        })
        .catch((err) => {
          console.log(err)
          // this.messages = err.response.data.messages
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
    deleteWishlist (WishlistId) {
      this.$store.dispatch('deleteWishlist', WishlistId)
        .then(({ data }) => {
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
          Swal.fire({
            toast: true,
            icon: 'success',
            title: data.message,
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
