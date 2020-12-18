<template>
  <tr>
    <th scope="row">{{ i }}</th>
    <td>{{ history.name }}</td>
    <td><img :src="history.image_url" :alt="history.name" height="50px"></td>
    <td>{{ history.price }}</td>
    <td>{{ history.quantity }}</td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryList',
  props: ['history', 'i']
}
</script>

<style>
</style>
