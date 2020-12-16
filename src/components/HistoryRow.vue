<template>
  <tr>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
      <div class="flex items-center">
        <div>
          <img
          class="h-12 w-12 rounded-full object-cover"
          :src="item.image_url"
          alt=""
        />
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
      <div class="text-sm leading-5 text-blue-900">
        {{ item.name }}
      </div>
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ item.price }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ item.quantity }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
    >
      {{ item.total }}
    </td>
    <td
      class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
    >
      {{ item.createdAt.toString().split('T')[0] }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'HistoryRow',
  props: ['item']
}
</script>

<style>

</style>
