<template>
  <div class="col-12 py-2">
    <div class="card flex-row flex-wrap" style="width:700px; margin-left: 20em">
      <div class="card-header border-0">
          <img :src="item.Product.image_url" alt="image" height="150px" width="200px">
      </div>
      <div class="card-block py-3" style="width: 350px">
          <h4 class="card-title"><strong>{{item.Product.name}}</strong></h4>
          <h6 class="card-subtitle text-right text-muted">{{convertDate}}</h6>
          <hr>
          <p class="card-text">
            {{currency}} X {{item.quantity}} <br>
            <span>Total: {{total}}</span>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryCard',
  props: ['item'],
  computed: {
    currency () {
      return new Intl.NumberFormat('id',
        { style: 'currency', currency: 'IDR' })
        .format(this.item.Product.price)
    },
    total () {
      return new Intl.NumberFormat('id',
        { style: 'currency', currency: 'IDR' })
        .format(this.item.Product.price * this.item.quantity)
    },
    convertDate () {
      function pad (s) { return (s < 10) ? '0' + s : s }
      var d = new Date(this.item.createdAt)
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')
    }
  }
}
</script>

<style>
img {
  object-fit: contain;
}
</style>
