<template>
  <div>
    <b-row no-gutters style="margin-top: 10px;" v-for="cart in carts" :key="cart.id">
      <b-col md="6">
        <b-card-img :src="cart.Product.image_url" alt="Image" class="rounded-0" style="height: 160px; width: 250px"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="">
          <b-card-text>
            <h5 style="margin-top: -20px">{{ cart.Product.name }}</h5>
            <h5 style="margin-top: -5px">@stock: {{cart.Product.stock}}</h5>
            <h5 style="margin-top: -5px">total: {{ cart.total | currency }}</h5>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-outline-secondary" @click="updateStock({ ProductId: cart.ProductId, Price: cart.Product.price, isPlus: 'min', id: cart.id, qty: cart.quantity })"><i class="fas fa-minus"></i></button>
              <button type="button" class="btn btn-outline-secondary" disabled >{{ cart.quantity }}</button>
              <button type="button" class="btn btn-outline-secondary" @click="updateStock({ ProductId: cart.ProductId, Price: cart.Product.price, isPlus: 'plus', id: cart.id })" v-if="cart.Product.stock > 0"><i class="fas fa-plus"></i></button>
              <button type="button" class="btn btn-outline-secondary" v-if="cart.Product.stock < 1" disabled><i class="fas fa-plus"></i></button>
              <button type="button" class="btn btn-outline-danger" style="border-radius: 50%; margin-left: 5px;" @click="deleteCartById(cart.id)"><i class="fas fa-times"></i></button>
            </div>
          </b-card-text>
        </b-card-body>
      </b-col><hr>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['carts'],
  data () {
    return {
    }
  },
  methods: {
    deleteCartById (id) {
      this.$store.dispatch('deleteCartById', id)
    },
    updateStock (payload) {
      if (payload.qty === 1 && payload.isPlus === 'min') {
        this.$snotify.info({
          sure: '? please press button to delete'
        })
      } else {
        this.$store.dispatch('updateStock', payload)
      }
    }
  }
}
</script>

<style>

</style>
