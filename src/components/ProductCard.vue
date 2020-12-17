<template>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" style="height: 20rem" :src="product.image_url" :alt="product.image_url">
    <div class="card-body">
      <h5 class="card-title">{{product.name}}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Stock: {{product.stock}}</li>
      <li class="list-group-item">Rp. {{setLable(product.price)}}</li>
    </ul>
    <button v-if="sign === 'loggedIn'"
      class="btn btn-primary btn-block"
      @click="addCart"
      >
      <i class="material-icons">add_shopping_cart</i>
    </button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    sign () {
      return this.$store.state.sign
    }
  },
  methods: {
    setLable (price) {
      const harga = '' + price
      const label = harga.split('')
      let count = 0
      for (let i = label.length; i >= 0; i--) {
        if (i === label.length) {
          count++
          continue
        }
        if (count % 3 === 0) {
          label.splice(i, 0, '.')
        }
        count++
      }
      if (label[0] === '.') {
        label.shift()
      }
      return (label.join('') + ',00')
    },
    addCart () {
      const payload = {
        ProductId: this.product.id
      }
      this.$store.dispatch('addCart', payload)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'On your cart!'
          })
          console.log(response.data)
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Hmmm!',
            text: 'This product is out of stock'
          })
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>
