<template>
  <div>
    <div class="card">
      <div class="row">
        <div class="col-4">
          <img :src="cart.Product.image_url" alt="">
        </div>
        <div class="col-8">
          <div class="card-title text-end m-1"><button type="button" class="btn-close" aria-label="Close"></button></div>
          <ul class="text-start mb-3">
            <li>{{ cart.Product.name }}</li>
            <li>{{ cart.Product.price }}</li>
          </ul>
          <div class="text-end m-1">
            <button class="btn"><b-icon-file-plus></b-icon-file-plus></button>
            {{ cart.quantity }}
            <button class="btn"><b-icon-file-minus></b-icon-file-minus></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: ['cart']
}
</script>

<style scoped>
li{
  list-style: none;
}
</style>
