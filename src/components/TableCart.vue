<template>
  <tr>
    <td><img :src='data.Product.image_url' class='img-table'></td>
    <td>{{ data.Product.name }}</td>
    <td>{{ data.Product.price }}</td>
    <td>
      <button @click.prevent="incrementQuantity (data.Product.id)" class='btn fas fa-plus-square' v-if="data.quantity < data.Product.stock"></button> <br>
        {{ data.quantity }} <br>
      <button @click.prevent="decrementQuantity (data)" class='btn fas fa-minus-square' v-if="data.quantity > 0"></button> <br>
    </td>
    <td>Rp. {{ convertPrice }}</td>
    <td><button @click.prevent="deleteId (data.id)" class='btn fas fa-trash-alt'></button></td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    decrementQuantity (data) {
      if (this.data.quantity > 1) {
        const requirement = {
          productId: data.Product.id,
          status: 'decrement'
        }
        this.$store.dispatch('patchCart', requirement)
      } else {
        this.$vToastify.prompt({
          body: 'Are you sure want to cancel buy this product?',
          answers: { Yes: true, No: false }
        })
          .then(value => value ? this.$store.dispatch('deleteId', data.id) : console.log('cancel delete'))
      }
    },
    incrementQuantity (id) {
      const requirement = {
        productId: id,
        status: 'increment'
      }
      this.$store.dispatch('patchCart', requirement)
    },
    deleteId (id) {
      this.$vToastify.prompt({
        body: 'Are you sure want to cancel buy this product?',
        answers: { Yes: true, No: false }
      })
        .then(value => value ? this.$store.dispatch('deleteId', id) : console.log('cancel delete'))
    }
  },
  computed: {
    convertPrice () {
      const total = this.data.Product.price * this.data.quantity
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style>
  .img-table{
    width: 100px;
  }
</style>
