<template>
  <div class="card mb-3 shadow me-2" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
        <img class="border-1 w-75 mt-2" :src="history.Product.image_url" alt="..." >
        </div>
        <div class="col-md-6">
        <div class="card-body text-start">
            <h5 class="card-title"> <b>{{history.Product.name}}</b></h5>
            <hr class="w-50">
            <h5 class="card-title">Rp.{{history.Product.price}} /pcs</h5>
            <h5 class="card-title">Quantity: {{history.Product.price}}</h5>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['history']
}
</script>

<style>

</style>
