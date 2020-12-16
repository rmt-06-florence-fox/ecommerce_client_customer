<template>
    <div class="flex justify-between pt-4 border-b">
        <!-- {{getData}} -->
        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
          {{getData.amount}} {{getData.cart.Product.name}}
        </div>
        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
        {{getFormarted}}
        </div>
    </div>
</template>

<script>

export default {
  name: 'cardTotalDetail',
  props: ['item', 'idx'],
  computed: {
    getData () {
      return this.$store.state.totalPrice[this.idx]
    },
    getFormarted () {
      return 'Rp. ' + this.getData.total
        .toString()
        .split('')
        .reverse()
        .map((el, i) => i % 3 === 0 && i !== 0 ? `${el}.` : el)
        .reverse()
        .join('') + ',00'
    }
  }
}
</script>

<style>

</style>
