<template>
  <div class="container mt-5">
    <div class="row mx-auto d-flex" style="width:100%">
        <div class="card col-3 m-2 border-0 shadow" style="width: 18rem;">
            <img :src="products.image_url" class="card-img-top mt-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">
                    <strong>{{ products.name }}</strong>
                </h5>
                <p class="card-text">IDR. {{ products.price }}</p>
                <p class="card-text">{{ products.stock }} available in stock</p>
                <p>add to cart</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products"],
};
</script>

<style>
</style>