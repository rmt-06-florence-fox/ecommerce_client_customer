<template>
  <div class="pb-2">
    <div class="card">
      <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_ctopYC.json"  background="transparent"  speed="1"  style="width: 200px; height: 200px;"  loop autoplay v-if="isLoading === true"/>
      <div class="card-content" v-else>
        <div class="media">
          <div class="media-left">
            <figure class="image is-3by2" style="width: 200px">
              <img :src="list.Product.image_url" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-5" style="width: 300px">{{list.Product.name}}</p>
            <p class="subtitle is-6">{{list.Product.category}}</p>
            <p><b>Price: </b>{{priceRp}} /each</p>
            <div class="columns pt-4 pl-3">
              <a class="button is-small" @click.prevent="minusItem(list.id)" v-if="list.totalItem > 1">
                <span class="icon is-small">
                  <i class="fas fa-chevron-left"></i>
                </span>
              </a>
              <div class="" style="width:30px; text-align: center">
                {{list.totalItem}}
              </div>
              <a class="button is-small" @click.prevent="plusItem(list.id)" v-if="list.totalItem < stock">
                <span class="icon is-small">
                  <i class="fas fa-chevron-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div class="media-content">
              <a class="button is-medium" @click.prevent="deleteItem(list.id)">
                <span class="icon is-medium">
                  <i class="fas fa-trash"></i>
                </span>
              </a>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  data () {
    return {
      totalItem: this.list.totalItem,
      stock: this.list.Product.stock,
      isLoading: false
    }
  },
  methods: {
    plusItem (id) {
      this.isLoading = true
      this.$store.dispatch('plusCart', id)
        .then(res => {
          return this.$store.dispatch('fetchCart')
        })
        .then(res => {
          this.$store.commit('FETCH_CARTS', res.data[0])
          this.$store.commit('FETCH_TOTAL_CHECKOUT', res.data[1])
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    minusItem (id) {
      this.isLoading = true
      this.$store.dispatch('minusCart', id)
        .then(res => {
          return this.$store.dispatch('fetchCart')
        })
        .then(res => {
          this.$store.commit('FETCH_CARTS', res.data[0])
          this.$store.commit('FETCH_TOTAL_CHECKOUT', res.data[1])
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteItem (id) {
      this.isLoading = true
      this.$store.dispatch('deleteCart', id)
        .then(res => {
          return this.$store.dispatch('fetchCart')
        })
        .then(res => {
          this.$store.commit('FETCH_CARTS', res.data[0])
          this.$store.commit('FETCH_TOTAL_CHECKOUT', res.data[1])
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  props: ['list'],
  computed: {
    priceRp: function () {
      let rupiah = ''
      const priceReverse = this.list.Product.price.toString().split('').reverse().join('')
      for (let i = 0; i < priceReverse.length; i++) if (i % 3 === 0) rupiah += priceReverse.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style>

</style>
