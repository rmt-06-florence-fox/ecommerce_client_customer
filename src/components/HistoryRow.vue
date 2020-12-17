<template>
  <tr>
    <td>
      1
    </td>
    <td>{{el.code}}</td>
    <td>
      {{ el.products }}
    </td>
    <td>{{ formatPrice(el.total_price) }}</td>
    <td>
      {{ moment(el.createdAt).format('MMMM Do YYYY') }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryRow',
  props: ['el'],
  methods: {
    formatPrice (price) {
      let result = ''
      const strPrice = String(price)
      for (let i = 0; i < strPrice.length; i++) {
        if ((strPrice.length - i) % 3 === 0 && i !== 0) {
          result += ',' + strPrice[i]
        } else {
          result += strPrice[i]
        }
      }
      return `Rp. ${result}`
    }
  }
}
</script>

<style>

</style>
