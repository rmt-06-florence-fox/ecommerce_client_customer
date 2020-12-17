<template>
  <b-card :img-src=cart.Product.image_url img-width="200px" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        <h4>{{ cart.Product.name }}</h4><br>
        <h5>Rp. {{ cart.Product.price }}</h5>
        <br><br>
       <span><b-button @click="minCart" class="btn btn-success"><i class="fas fa-minus"></i></b-button> {{ cart.quantity }} <b-button @click="plusCart" class="btn btn-success"><i class="fas fa-plus"></i></b-button></span>
      </b-card-text>
    </b-card>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['cart'],
  methods: {
    minCart () {
      const payload = {
        id: this.cart.id,
        quantity: this.cart.quantity - 1
      }
      if (this.cart.quantity === 1) {
        this.$store.dispatch('deleteCart', payload)
          .then(() => {
            this.fetchCart()
          })
          .catch(err => {
            this.$swal(
              'Error',
                `${err.response.status} ${err.response.data.error.split(',')}`,
                'error' // success,error,warning
            )
          })
      } else {
        this.$store.dispatch('updateCart', payload)
          .then(() => {
            this.fetchCart()
          })
          .catch(err => {
            this.$swal(
              'Error',
              `${err.response.status} ${err.response.data.error.split(',')}`,
              'error' // success,error,warning
            )
          })
      }
    },
    plusCart () {
      const payload = {
        id: this.cart.id,
        quantity: this.cart.quantity + 1
      }
      this.$store.dispatch('updateCart', payload)
        .then(() => {
          this.fetchCart()
        })
        .catch(err => {
          this.$swal(
            'Error',
            `${err.response.status} ${err.response.data.error.split(',')}`,
            'error' // success,error,warning
          )
        })
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>
  span{
    font-size: 25px;
  }
</style>
