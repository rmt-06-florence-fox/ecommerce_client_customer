<template>
  <tr>
    <td><img :src='data.Product.image_url' class='img-table'></td>
    <td>{{ data.Product.name }}</td>
    <td>{{ data.Product.price }}</td>
    <td>{{ data.quantity }}</td>
    <td>Rp. {{ convertPrice }}</td>
    <td>{{ convertDate }}</td>
  </tr>
</template>

<script>
export default {
  name: 'TableTransactions',
  props: ['data'],
  computed: {
    convertPrice () {
      const total = this.data.Product.price * this.data.quantity
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    convertDate () {
      return new Date(this.data.updatedAt).toDateString()
    }
  }
}
</script>

<style>
  .img-table{
    width: 100px;
  }
</style>
