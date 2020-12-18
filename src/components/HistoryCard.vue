<template>
  <div class="card bg-light text-dark">
    <img class="card-img-top" :src="product.Product.image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title"> {{product.Product.name}} </h5>
      <p class="card-text">{{product.Product.description}}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{product.Product.price}}</li>
      <li class="list-group-item">{{product.Product.stock}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HistoryCard',
  props: ['product']
}
</script>

<style>

input {
  width: 25%;
  text-align: center;
}

</style>
