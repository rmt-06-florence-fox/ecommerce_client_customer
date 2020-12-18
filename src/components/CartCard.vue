<template>
  <div class="col mt-4">
    <div class="card" style="width:20rem">
      <img :src="cart.Product.image_url" class="card-img-top" alt="product.name">
      <div class="card-body">
        <h5 class="card-title">{{ cart.Product.name }}</h5>
        <p class="card-text">Category: {{ cart.Product.Category.name }}</p>
        <p class="card-text border-secondary border border-5 border-left-0 border-right-0">{{ formatRupiah(cart.Product.price) }}</p>
        <p class="card-text text-black-50">stock: {{ cart.Product.stock }}</p>
        <div class="container mb-2">
          <label for="input-1">Quantity</label>
          <b-form-input v-model="quantity" @click="updateQuantity" @keyup="updateQuantity" onkeydown="return false" :disabled="!cart.Product.stock" type="number" style="border:solid gray 0.1rem" class="text-center" :min="1" :max="cart.Product.stock"></b-form-input>
        </div>
        <p v-if="quantity <= cart.Product.stock" class="card-text border-secondary border border-5 border-left-0 border-right-0">Subtotal: {{ formatRupiah(subtotal) }}</p>
        <div v-else>
          <p class="card-text border-secondary border border-5 border-left-0 border-right-0 text-danger">Quantity exceeds stock.</p>
          <p class="card-text border-secondary border border-5 border-left-0 border-right-0 text-danger">This item will not be checked out.</p>
        </div>
        <a href="" @click.prevent="deleteCart(cart.id)" class="btn-sm btn-danger mt-2">Remove from Cart</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart'],
  data () {
    return {
      quantity: this.cart.quantity,
      CartId: this.cart.id
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
    updateQuantity () {
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
          this.messages = err.response.data.messages
          // this.error = true
          // this.$nextTick(() => {
          //   this.$refs.error[0].$el.scrollIntoView()
          // })
        })
    },
    deleteCart (CartId) {
      this.$store.dispatch('deleteCart', CartId)
        .then(({ data }) => {
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
    addWishList (ProductId) {
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
