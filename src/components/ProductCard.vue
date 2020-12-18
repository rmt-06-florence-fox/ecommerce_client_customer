<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto"
      color="grey lighten-4"
      max-width="600"
      height="350"
    >
      <v-img
        :src="product.image_url"
        class="blue--text align-end"
        aspect-ratio="16/9"
        height="200px"
      >
        <v-card-title>{{ product.Category.name }}</v-card-title>
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
            <v-btn v-if="hover" @click="addToCart(product.id)" outlined><v-icon>mdi-cart-plus</v-icon></v-btn>
          </div>

        </v-expand-transition>
      </v-img>
      <v-card-text class="text--primary">
        <div><a href="/product" style="text-decoration: none">{{product.name}}</a></div>
        <div>{{ formatPrice(product.price) }}</div>
        <div>Stock: {{product.stock}}</div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    addToCart (id) {
      const payload = {
        ProductId: id
      }

      this.$store.dispatch('addToCart', payload)
    },
    formatPrice (price) {
      let result = ''
      const strPrice = String(price)
      for (let i = 0; i < strPrice.length; i++) {
        if ((strPrice.length - i) % 3 === 0 && i !== 0) {
          result += ',' + strPrice[i]
        } else {
          result += strPrice[i]
        }
      }
      return `Rp. ${result}`
    }
  }
}
</script>

<style>

</style>
