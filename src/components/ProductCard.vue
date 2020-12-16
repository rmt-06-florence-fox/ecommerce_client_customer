<template>
  <b-card class="col-4">
    <b-card-header>{{ product.name}}</b-card-header>
    <b-card-body>
      <img :src="product.image_url" alt="">
    </b-card-body>
    <b-card-footer>
      <small>Rp {{ product.price}}</small> |
      <small>stock : {{ product.stock}}</small> |
      <b-button variant="primary" v-if="status === 'loggedIn'"><b-icon icon="plus-square"></b-icon></b-button>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    status () {
      return this.$store.state.status
    }
  }
}
</script>

<style>
img{
  width: 100px;
}
</style>
