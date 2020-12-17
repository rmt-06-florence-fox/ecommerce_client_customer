<template>
  <b-card :img-src=cart.Product.image_url img-width="200px" img-alt="Card image" img-left class="mb-3">
      <b-card-text>
        <h4>{{ cart.Product.name }}</h4><br>
        <h5>Rp. {{ cart.Product.price }}</h5>
        <br>
        <h5>{{cart.quantity}} Pcs</h5>
        <h5>Date Purchased : {{cart.updatedAt.split("T")[0]}}</h5>
      </b-card-text>
    </b-card>
</template>

<script>
export default {
  name: 'CartHistory',
  props: ['cart']
}
</script>

<style>

</style>
