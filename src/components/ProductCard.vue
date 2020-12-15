<template>
  <b-card
  no-body
  style="max-width: 20rem;"
  img-src="https://placekitten.com/380/200"
  img-alt="Image"
  img-top
>
    <template #header>
      <h4 class="mb-0">Product Name here</h4>
    </template>

    <b-card-body>
      <b-card-title class="mb-3">Price here</b-card-title>
      <b-card-text> Stock available : 200 </b-card-text>
    </b-card-body>

    <b-card-body>
      <a href="#" class="card-link">Add to cart</a>
    </b-card-body>

  </b-card>
</template>

<script>
export default {
  name: 'ProductCard'
}
</script>

<style>

</style>
