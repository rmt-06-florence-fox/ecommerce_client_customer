<template>
  <div class="col-md-3">
    <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 17rem;">
      <img :src="productList.image_url" style="height: 200px; object-fit: cover;" class="img-fluid -card-img-top d-block w-100" alt="...">
      <div class="card-body text-left">
        <h5 class="card-title">{{productList.name}}</h5>
        <p class="card-text">{{productList.price}}</p>
        <p class="card-text">{{productList.stock}}</p>
      </div>
      <button class="btn btn-primary" @click="idProduct(productList.id)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ProductCard',
  props: ['productList'],
  methods: {
    idProduct (id) {
      if (!localStorage.getItem('access_token')) {
        Swal.fire('Please Login First')
        this.$router.push('/login')
      } else {
        Swal.fire('Success add to cart')
        this.$store.dispatch('addCart', id)
      }
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  created () {
  }
}
</script>

<style>

</style>
