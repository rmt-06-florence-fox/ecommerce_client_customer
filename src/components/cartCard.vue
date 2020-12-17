<template>
  <div class="column is-10 pb-2">
    <div class="card">
      <div class="is-flex is-justify-content-center" v-if="isLoading === true">
        <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_ctopYC.json"  background="transparent"  speed="1"  style="width: 140px; height: 140px;"  loop autoplay/>
      </div>
      <div class="card-content" v-else>
        <div class="media">
          <div class="media-left pt-3">
            <figure class="image is-3by2" style="width: 100px">
              <img :src="list.Product.image_url" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-6" style="width: 300px">{{list.Product.name}}</p>
            <p class="subtitle is-7">{{list.Product.category}}</p>
            <ul>
              <li class="is-size-7"><b>Price: </b>{{priceRp}} /each</li>
              <li class="is-size-7"><b>Stock(s): </b>{{list.Product.stock}}</li>
            </ul>
            <div class="columns pt-4 pl-3 is-grouped">
              <a class="" @click.prevent="minusItem(list.id)" v-if="list.totalItem > 1">
                <span class="icon is-small">
                  <i class="fas fa-chevron-left"></i>
                </span>
              </a>
              <div class="is-size-7" style="width:30px; text-align: center">
                {{list.totalItem}}
              </div>
              <a class="" @click.prevent="plusItem(list.id)" v-if="list.totalItem < stock">
                <span class="icon is-small">
                  <i class="fas fa-chevron-right"></i>
                </span>
              </a>
              <a class="pl-4" @click.prevent="deleteItem(list.id)">
                <span class="icon is-small">
                  <i class="fas fa-trash"></i>
                </span>
              </a>
            </div>
          </div>
            <div class="media-content">
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
