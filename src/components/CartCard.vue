<template>
  <div class="card pmd-card shadow p-3 mb-2 bg-white rounded">
    <div class="card-body d-flex flex-row">
     <img class="ml-3" :src="cart.Product.image_url"  width="80" height="80">
        <div class="media-body">
          <h5><strong>{{cart.Product.name}}</strong></h5>
          <h5>{{price}}</h5>
            <div class="row justify-content-center">
              <div class="col-4">
                <div class="input-group">
                  <span class="input-group-btn">
                    <button @click="decreaseItem" type="button" class="btn btn-default btn-number">
                      <span class="glyphicon glyphicon-minus"></span>
                    </button>
                  </span>
                  <input type="text" class="form-control input-number text-center" disabled :value="cart.quantity">
                  <span class="input-group-btn">
                    <button v-if="cart.Product.stock <= cart.quantity" type="button" class="btn btn-default btn-number disabled">
                      <span class="glyphicon glyphicon-plus"></span>
                    </button>
                    <button v-else @click="increaseItem" type="button" class="btn btn-default btn-number">
                      <span class="glyphicon glyphicon-plus"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart'],
  methods: {
    decreaseItem () {
      this.$store.dispatch('decreaseItem', this.cart)
    },
    increaseItem () {
      this.$store.dispatch('increaseItem', this.cart)
    }
  },
  computed: {
    price () {
      let rupiah = ''
      const angkarev = this.cart.Product.price.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style>

</style>
