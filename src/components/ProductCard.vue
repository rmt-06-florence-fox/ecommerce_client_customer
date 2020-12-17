<template>
    <div class="card col-sm-4" style="width: 18rem;">
        <img :src="product.image_url" :alt="product.name">
        <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <ul>
                <li>Harga : {{product.price}}</li>
                <li>Stock : {{product.stock}}</li>
            </ul>
            <button
            @click="addCart(product.id)" class="btn btn-outline-primary"
            >Add to chart</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    addCart (id) {
      this.$store.dispatch('addToCart', id)
    }
  }
}
</script>

<style>
.col-3{
    max-width: 100px;
    max-height: 100px;
}
</style>
