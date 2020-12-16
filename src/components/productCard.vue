<template>
  <div class="column is-3">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="list.image_url" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-5">{{list.name}}</p>
            <p class="subtitle is-6">{{list.category}}</p>
          </div>
        </div>

        <div class="content" style="list-style-type: none">
          <li><b>Price: </b>{{priceRp}}</li>
          <li><b>Stock(s): </b>{{list.stock}}</li>
        </div>
        <div class="buttons">
          <a @click.prevent="addWishlist" class="button is-medium">
            <span class="icon is-medium">
              <i class="fas fa-heart"></i>
            </span>
          </a>
          <a @click.prevent="addToCart" class="button is-medium">
            <span class="icon is-medium">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['list'],
  computed: {
    priceRp: function () {
      let rupiah = ''
      const priceReverse = this.list.price.toString().split('').reverse().join('')
      for (let i = 0; i < priceReverse.length; i++) if (i % 3 === 0) rupiah += priceReverse.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style>

</style>
