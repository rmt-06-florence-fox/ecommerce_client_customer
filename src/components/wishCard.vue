<template>
  <div class="card mb-3 shadow me-2" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img class="border-1 w-75 mt-2" :src="wish.Product.image_url" alt="..." >
    </div>
    <div class="col-md-6">
      <div class="card-body text-start">
        <h5 class="card-title"> <b>{{wish.Product.name}}</b></h5>
        <hr class="w-50">
        <h5 class="card-title">Rp.{{wish.Product.price}} /pcs</h5>
        <div v-if="wish.Product.stock > 0">
          <a href="#" @click="addToCart({id: wish.Product.id, name: wish.Product.name})" class="btn btn-warning me-5">Add to Cart</a>
        </div>
      </div>
    </div>
    <div @click="destroyWish(wish.id)" class="col-md-2">
        <button type="button" class="btn-close mt-3" aria-label="Close"></button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['wish'],
  methods: {
    destroyWish (id) {
      this.$store.dispatch('destroyWish', id)
    },
    addToCart (payload) {
    //   console.log(payload)
      this.$store.dispatch('addToCart', payload)
    }
  }
}
</script>

<style>

</style>
