<template>
  <div class="col-4 mt-5 mb-3 ">
      <div class="card border border-4 border-success" style="width: 18rem;">
          <img :src="product.image_url" class="card-img-top" alt="...">
        <div class="card-body text-start">
          <h4 class="card-title fs-3">{{product.name}}</h4>
          <div>
              <hr>
          </div>
          <p class="card-subtitle fs-5 mb-1">Rp.{{product.price}}</p>
          <p class="card-subtitle fs-5 mb-2">Stock: {{product.stock}}</p>
          <div v-if="product.stock > 0" class="columns">
            <a href="#" @click="addToCart({id: product.id, name: product.name})" class="btn btn-warning me-5">Add to Cart</a>
            <a href="#" @click="addWish({id: product.id, name: product.name})" class="ms-5 "><i class=" fa fa-heart fa-2x text-danger" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'productCard',
  props: ['product'],
  methods: {
    addToCart (payload) {
      this.$store.dispatch('addToCart', payload)
    },
    addWish (payload) {
      this.$store.dispatch('addWish', payload)
    }
  }
}
</script>

<style>
    .card-img-top {
        height: 280px;
        width: 280px;
    }

</style>
