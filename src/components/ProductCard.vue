<template>
<div class="row">
    <div class="col-4">
        <div class="card mt-5" style="width: 18rem;">
            <img @click="addToWishList(product.id)" src="@/assets/heart2.svg" alt="" class="bottom-left-icon">
            <img :src="product.image" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Harga: Rp {{ product.price }},00</li>
                <li class="list-group-item">{{ product.description }}</li>
            </ul>
            <div class="card-body">
                <a @click.prevent="addToCart" class="card-link" style="cursor:pointer;">Add to cart</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addToCart () {
      const payload = {
        quantity: 1,
        status: true,
        ProductId: this.product.id
      }
      this.$store.dispatch('addToCart', payload)
    },
    addToWishList (id) {
      console.log(id)
      this.$store.dispatch('addWish', id)
        .then(() => {
          this.$store.dispatch('fetchWishList')
          Swal.fire({
            icon: 'success',
            title: 'Product has been added to wishlist',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You cannot add the same product to your wishlist'
          })
        })
    }
  }
}
</script>

<style>

</style>
