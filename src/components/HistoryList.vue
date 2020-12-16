<template>
  <tr>
    <td>{{ index + 1 }} </td>
    <td>{{ history.Product.name }} </td>
    <td>{{ history.quantity }} </td>
    <td>Rp. {{ convertRupiah }},00 </td>
    <td>{{ convertDate }} </td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryList',
  props: ['history', 'index'],
  computed: {
    convertRupiah () {
      const total = this.history.quantity * this.history.Product.price
      const numberString = total.toString()
      const sisa = numberString.length % 3
      var rupiah = numberString.substr(0, sisa)
      const ribuan = numberString.substr(sisa).match(/\d{3}/g)
      if (ribuan) {
        const separator = sisa ? '.' : ''
        rupiah += separator + ribuan.join('.')
      }
      return rupiah
    },
    convertDate () {
      const temp = new Date(this.history.updatedAt).toDateString()
      return temp
    }
  }
}
</script>

<style>

</style>
