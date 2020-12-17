<template>
  <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4">
        <img :src="CartProducts.Product.image_url" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ CartProducts.Product.name }}</h5>
          <p class="card-text">
            <small class="text-muted">{{ CartProducts.quantity }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["CartProducts"]
};
</script>

<style>
</style>