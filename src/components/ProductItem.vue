<template>
<b-col cols="3">
  <b-card
    :title=product.name
    :img-src=product.image_url
    img-alt="Image"
    img-top
  >
    <b-card-text>
      Price : {{ product.price }}
      Stock : {{ product.stock }}
    </b-card-text>
    <b-button v-if="product.stock > 0" class="btn btn-success" @click="addToCart">Add to cart</b-button>
    <b-button v-else class="btn btn-danger" @click="addToCart">Out of stock</b-button>
  </b-card>
</b-col>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['product'],
  methods: {
    addToCart () {
      const token = localStorage.getItem('access_token')
      if (!token) {
        this.$swal('Login first',
          'you must login to continue shopping',
          'warning')
        this.$router.push({ name: 'Login' })
      } else {
        const payload = {
          ProductId: this.product.id,
          quantity: 1
        }
        console.log(payload)
        this.$store.dispatch('addCart', payload)
          .then(() => {
            this.$swal(
              'Success',
              'Success Add to cart',
              'success' // success,error,warning
            )
          })
          .catch(err => {
            this.$swal(
              'Error',
            `${err.response.status} ${err.response.data.error.split(',')}`,
            'error' // success,error,warning
            )
          })
      }
    }
  }
}
</script>

<style>

</style>
