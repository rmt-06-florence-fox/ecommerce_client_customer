<template>
  <tr>
    <td>{{ index+1 }}</td>
    <td>{{ history.Product.name }}</td>
    <td> *coming soon*</td>
    <td>{{ history.quantity }}</td>
    <td>{{ history.updatedAt.split('T')[0] }}</td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryRow',
  props: ['history', 'index']
}
</script>

<style>

</style>
