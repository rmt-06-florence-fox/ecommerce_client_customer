<template>
  <b-card
  no-body
  style="max-width: 20rem;"
  :img-src="product.imageUrl"
  img-alt="Image"
  img-top
>
    <template #header>
      <h4 class="mb-0">{{product.name}}</h4>
    </template>

    <b-card-body>
      <b-card-title class="mb-3">{{formattingPrice()}}</b-card-title>
      <b-card-text> Stock available : {{product.Stock}} </b-card-text>
    </b-card-body>

    <b-card-body>
      <a href="#" class="card-link">Add to cart</a>
    </b-card-body>

  </b-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    formattingPrice () {
      const string = this.product.price + ''
      let array = string.split('').reverse()
      let counter = 0
      array = array.map(el => {
        if (counter % 3 === 0 && counter !== 0) el = el + '.'
        counter++
        return el
      })
      return 'Rp. ' + array.reverse().join('')
    }
  }
}
</script>

<style>

</style>
