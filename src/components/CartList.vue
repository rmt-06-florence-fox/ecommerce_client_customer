<template>
      <li class="media mb-3">
        <img class="mr-5" :src="cart.Product.image_url" height="130px" width="130px" alt="Generic placeholder image">
        <div class="media-body-center text-left">
          <h5 class="mt-0 mb-1">{{ cart.Product.name }}</h5>
          <p class="mt-0 mb-1">{{ price }}</p>
          <p class="mt-0 mb-1">Qty. {{ cart.quantity }}</p>
          <div class="row">
            <div class="col-6">
              <button @click="min(cart.Product.id)" class="btn btn-secondary">-</button>
              <button @click="plus(cart.Product.id)" class="btn btn-secondary ml-3">+</button>
            </div>
            <div class="col-6">
              <button
                @click="del(cart.id)"
                class="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
      </li>
</template>

<script>
export default {
  name: 'CartList',
  props: ['cart'],
  computed: {
    price () {
      return 'Rp. ' + this.cart.Product.price.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    }
  },
  methods: {
    del (id) {
      this.$store.dispatch('delCart', id)
    },
    plus (id) {
      const payload = {
        id,
        quantity: 1
      }
      this.$store.dispatch('addOrUpdateCart', payload)
    },
    min (id) {
      const payload = {
        id,
        quantity: -1
      }
      this.$store.dispatch('addOrUpdateCart', payload)
    }
  }
}
</script>

<style>
</style>
