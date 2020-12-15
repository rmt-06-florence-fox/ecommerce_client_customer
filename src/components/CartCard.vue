<template>
  <b-card
    :img-src="product.imageUrl"
    img-width="50%"
    img-height="305"
    img-left
    style="width:90%"
  >
   <template #header>
      <h5 class="mb-0">{{product.name}}</h5>
    </template>

    <b-card-body>
      <b-card-title class="mb-3">{{formattingPrice()}}</b-card-title>
      <b-card-text> Stock available : {{product.stock}} </b-card-text>
      <div class="d-flex">
        <b-button @click="decrement">-</b-button>
        <b-form style="width:50%">
          <b-form-input
            type="number"
            v-model="number"
          ></b-form-input>
        </b-form>
        <b-button @click="increment">+</b-button>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'CartCard',
  data () {
    return {
      number: 0
    }
  },
  methods: {
    increment () {
      if (this.number < this.product.stock) {
        this.number++
      }
    },
    decrement () {
      if (this.number > 0) {
        this.number--
      }
    },
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
  },
  watch: {
    number () {
      if (this.number < 0) {
        this.$store.commit('setErrors', ['The number of pieces cannot be less than negative'])
      } else if (this.number > this.product.stock) {
        this.$store.commit('setErrors', ['The number of pieces is more than available stock'])
      }
    }
  },
  props: ['product']
}
</script>

<style>

</style>
