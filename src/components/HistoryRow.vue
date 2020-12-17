<template>
  <tr>
    <td>
      1
    </td>
    <td>Rp. {{el.code}}</td>
    <td>
      {{ el.products }}
    </td>
    <td>{{ el.total_price }}</td>
    <td>
      {{ el.createdAt }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryRow',
  props: ['el']
}
</script>

<style>

</style>
