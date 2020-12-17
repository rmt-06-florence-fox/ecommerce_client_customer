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
              <li class="is-size-7"><b>Total Price: </b>{{priceRp}}</li>
              <li class="is-size-7"><b>Total item(s): </b>{{list.totalItem}}</li>
            </ul>
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
  name: 'CheckoutCard',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
  },
  props: ['list'],
  computed: {
    priceRp: function () {
      let rupiah = ''
      const priceReverse = this.list.totalPrice.toString().split('').reverse().join('')
      for (let i = 0; i < priceReverse.length; i++) if (i % 3 === 0) rupiah += priceReverse.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('')
    }
  }
}
</script>

<style>

</style>
