<template>
  <div class="container-fluid">
  <div class="row">
    <div class="col-3" v-for="product in products" :key="product.id">
      <div class="card bg-dark text-white mt-4" style="box-shadow: 0px 0px 15px;">
        <img :src="product.image_url" class="card-img" style="height: 260px">
        <div class="card-img-overlay" style="text-align: left; margin-top: 150px;">
          <h6 class="card-title" style="margin-bottom: 1px;">{{ product.name }}</h6>
          <p class="card-text" style="margin-bottom: 1px;">{{ product.price | currency }}</p>
          <div class="input-group mb-3">
            <input type="text" class="form-control col-2" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" :value="product.stock" disabled>
            <button class="btn btn-outline-warning btn-sm" type="button" id="button-addon2"
            @click="addToCart(
              {
                ProductId: product.id,
                price: product.price
              }
            )"
            >add to <i class="fas fa-shopping-cart fa-lg" id="cart"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: ['products'],
  data () {
    return {
    }
  },
  methods: {
    addToCart (payload) {
      const token = localStorage.getItem('access_token')
      if (!token) {
        this.$snotify.info({
          Please: 'Login or Register First'
        })
      } else {
        this.$store.dispatch('addToCart', payload)
        this.$snotify.success({
          Success: 'add to cart'
        })
      }
    }
  }
}
</script>

<style>
* { box-sizing: border-box; }

body { font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif }

</style>
