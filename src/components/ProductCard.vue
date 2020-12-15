<template>
  <!-- 1 Product -->
  <div class="col-3" style="">
    <div class="card m-2 border-0 border-radius shadow">
      <div class="hovereffect">
        <img :src="product.image_url" class="product-img card-img-top mt-2" :alt="product.name">
        <div class="overlay">
          <a class="info" href="#">Add to Cart</a>
        </div>
      </div>
      <div class="card-body d-flex flex-column p-1">
        <img src="../assets/heart2.svg" alt="" class="bottom-left-icon">
        <p class="bottom-left">Stock : {{product.stock}}</p>
        <h3 class="ml-2 card-text allign-left">{{product.name}}</h3>
        <h6 class="ml-2 mb-2 card-text allign-left">{{product.price}}</h6>
      </div>
    </div>
  </div>
  <!-- 1 Product -->
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product']
}
</script>

<style>

</style>
