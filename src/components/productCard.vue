<template>
  <div class="column is-2">
    <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_hluo7ags.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay v-if="isLoading === true"/>
    <div class="card" v-else>
      <div class="card-image">
        <figure class="image is-3by2">
          <img :src="list.image_url" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-7">{{list.name}}</p>
            <p class="subtitle is-7">{{list.category}}</p>
          </div>
        </div>

        <div class="content" style="list-style-type: none">
          <li class="is-size-7"><b>Price: </b>{{priceRp}}</li>
          <li class="is-size-7"><b>Stock(s): </b>{{list.stock}}</li>
        </div>
        <div class="buttons">
          <a @click.prevent="addWishlist(list.id)" class="button is-small">
            <span class="icon is-small">
              <i class="fas fa-heart"></i>
            </span>
          </a>
          <a @click.prevent="addToCart(list.id)" class="button is-small" v-if="list.stock > 0">
            <span class="icon is-small">
              <i class="fas fa-shopping-cart"></i>
            </span>
          </a>
          <p v-if="list.stock < 1">We're sorry, we out of stock.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data () {
    return {
      isLoading: false
    }
  },
  props: ['list'],
  methods: {
    addToCart (id) {
      this.isLoading = true
      this.$store.dispatch('addCart', id)
        .then(res => {
          this.$router.push('/yourCart')
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    addWishlist (id) {
      this.isLoading = true
      this.$store.dispatch('addWishlist', id)
        .then(res => {
          return this.$store.dispatch('fetchWishlists')
        })
        .then(res => {
          this.$store.commit('FETCH_WISHLISTS', res.data)
          this.$router.push('/yourWishlist')
        })
        .catch(err => {
          console.log(err.response)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
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
