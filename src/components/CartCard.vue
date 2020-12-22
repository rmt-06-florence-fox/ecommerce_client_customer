<template>
  <div class="col mt-4">
    <div class="card">
      <img :src="cart.Product.image_url" class="card-img-top" :alt="cart.Product.name">
      <div class="card-body">
        <img @click="addWishList(cart.Product.id, cart.id)" src="../assets/empty-star.svg" class="wishlist-icon">
        <h5 class="card-title">{{ cart.Product.name }}</h5>
        <p class="card-text">Category: {{ cart.Product.Category.name }}</p>
        <p class="card-text border-secondary border border-5 border-left-0 border-right-0">{{ formatRupiah(cart.Product.price) }}</p>
        <p class="card-text text-black-50">stock: {{ cart.Product.stock }}</p>
        <div class="container mb-2">
          <label for="input-1">Quantity</label>
          <b-form-input v-model="quantity" @click="updateQuantity" @keyup="updateQuantity" :disabled="!cart.Product.stock" type="number" style="border:solid gray 0.1rem" class="text-center" :min="1" :max="cart.Product.stock"></b-form-input>
        </div>
        <p v-if="quantity <= cart.Product.stock" class="card-text border-secondary border border-5 border-left-0 border-right-0">Subtotal: {{ formatRupiah(subtotal) }}</p>
        <div class="mb-2" v-else>
          <p class="card-text border-secondary border border-5 border-left-0 border-right-0 text-danger">Quantity exceeds stock.</p>
          <p class="card-text border-secondary border border-5 border-left-0 border-right-0 text-danger">This item will not be checked out.</p>
        </div>
        <a href="" @click.prevent="deleteCart(cart.id)" class="btn-sm btn-danger">Remove from Cart</a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'CartCard',
  props: ['cart'],
  data () {
    return {
      quantity: this.cart.quantity,
      CartId: this.cart.id,
      stock: this.cart.Product.stock
    }
  },
  methods: {
    formatRupiah (price) {
      return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`
    },
    updateQuantity () {
      if (this.quantity !== '') {
        const updateData = {
          quantity: this.quantity,
          CartId: this.CartId
        }
        this.$store.dispatch('updateQuantity', updateData)
          .then(({ data }) => {
            this.$store.dispatch('fetchCarts')
          })
          .catch((err) => {
            console.log(err)
            // this.messages = err.response.data.messages
            // this.error = true
            // this.$nextTick(() => {
            //   this.$refs.error[0].$el.scrollIntoView()
            // })
            if (err.response.data.message) {
              Swal.fire(
                'Oh, no...',
                err.response.data.message,
                'error'
              )
              if (err.response.data.message === 'Minimum quantity is 1') {
                this.quantity = 1
              } else if (err.response.data.message === 'Quantity exceeds stock') {
                this.quantity = this.stock
              }
            } else if (err.response.data.messages) {
              let messages = ''
              for (let i = 0; i < err.response.data.messages.length; i++) {
                if (i === err.response.data.messages.length - 1) {
                  messages += err.response.data.messages[i]
                } else {
                  messages += err.response.data.messages[i] + '\n'
                }
              }
              Swal.fire(
                'Oh, no...',
                messages,
                'error'
              )
              this.quantity = 1
            }
          })
      }
    },
    deleteCart (CartId) {
      this.$store.dispatch('deleteCart', CartId)
        .then(({ data }) => {
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
          this.$store.dispatch('fetchCarts')
        })
        .catch((err) => {
          console.log(err)
          this.message = err.response.data.message
          this.error = true
          // this.$nextTick(()=> {
          //    this.$refs.error.$el.scrollIntoView();
          // });
        })
    },
    addWishList (ProductId, CartId) {
      this.$store.dispatch('addWishlist', ProductId)
        .then(({ data }) => {
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Moved to your wishlist',
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
          return this.$store.dispatch('deleteCart', CartId)
        })
        .then(({ data }) => {
          this.$store.dispatch('fetchCarts')
          this.$store.dispatch('fetchProducts')
          this.$store.dispatch('fetchWishlists')
        })
        .catch((err) => {
          console.log(err)
          this.message = err.response.data.message
          this.error = true
          // this.$nextTick(()=> {
          //   console.log(this.$refs.error)
          //    this.$refs.error[0].$el.scrollIntoView();
          // });
          Swal.fire({
            toast: true,
            icon: 'error',
            title: this.message,
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
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
    subtotal () {
      return this.cart.Product.price * this.quantity
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>

</style>
