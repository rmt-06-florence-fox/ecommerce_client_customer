<template>
  <div class="card pmd-card shadow p-3 mb-2 bg-white rounded">
    <div class="card-body d-flex flex-row">
     <img :src="transaction.Product.image_url" class="ml-3"  width="80" height="80">
        <div class="media-body">
          <h4><strong>{{transaction.Product.name}}</strong></h4>
          <h5>Amount: {{transaction.quantity}}</h5>
          <h5>Total price: {{price}}</h5>
          <h5>Checkout Date: {{date}}</h5>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionCard',
  props: ['transaction'],
  computed: {
    price () {
      const price = this.transaction.Product.price * this.transaction.quantity
      let rupiah = ''
      const angkarev = price.toString().split('').reverse().join('')
      for (let i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    },
    date () {
      const date = this.transaction.createdAt.split('T')[0]
      return date
    }
  }
}
</script>

<style>

</style>
