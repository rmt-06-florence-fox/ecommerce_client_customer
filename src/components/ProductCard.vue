<template>
<div class="row">
    <div class="col-4">
        <div class="card mt-5" style="width: 18rem;">
            <img :src="product.image" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Harga: Rp {{ product.price }},00</li>
                <li class="list-group-item">{{ product.description }}</li>
            </ul>
            <div class="card-body">
                <a @click.prevent="addToCart" class="card-link" style="cursor:pointer;">Add to cart</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addToCart () {
      const payload = {
        quantity: 1,
        status: true,
        ProductId: this.product.id
      }
      this.$store.dispatch('addToCart', payload)
    }
  }
}
</script>

<style>

</style>
