<template>
<div
  class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8"
>
  <div
    class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12"
  >
  </div>
  <div
    class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg"
  >
    <table class="min-w-full">
      <thead>
        <tr>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
          >
            IMG
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
          >
            PRODUCT NAME
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
          >
            PRICE
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
          >
            QUANTITY
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
          >
            TOTAL
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
          >
            Created At
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <HistoryRow v-for="(item,i) in histories" :key="i" :item="item"/>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
// v-for="(item,i) in histories" :key="i" :item="item"
import HistoryRow from './HistoryRow'
export default {
  name: 'historyTable',
  components: {
    HistoryRow
  },
  computed: {
    histories () {
      return this.$store.state.histories
    }
  }
}
</script>

<style>
</style>
