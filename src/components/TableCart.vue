<template>
  <tr>
    <td><img :src='data.Product.image_url' class='img-table'></td>
    <td>{{ data.Product.name }}</td>
    <td>{{ data.Product.price }}</td>
    <td>{{ data.quantity }}</td>
    <td>Rp. {{ convertPrice }}</td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
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
