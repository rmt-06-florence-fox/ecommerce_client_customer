<template>
    <div class="card col-sm-4" style="width: 18rem;">
        <img :src="product.Product.image_url" :alt="product.name">
        <div class="card-body">
            <h4 class="card-title">{{product.Product.name}}</h4>
            <h5>Total : {{product.Product.price}} x {{product.quantity}}</h5>
            <div class="edit-ammount">
                <a
                v-if="product.quantity > 1"
                @click="minus(product.id)"
                href="#"
                class="fa fa-minus"></a>
                <input

                v-model="product.quantity"
                type="text"
                >
                <a
                v-if="product.quantity <= product.Product.stock"
                @click="add(product.id)"
                href="#"
                class="fa fa-plus"></a>
            </div>
            <!-- <input
            @click="editQuantity(product.id)"
            v-model="product.quantity"
            type="number"><br> -->
            <button
            @click="removeFromCart (product.id)" class="btn btn-outline-danger"
            >Remove from chart</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    removeFromCart (id) {
      this.$store.dispatch('removeFromCart', id)
    },
    add (id) {
      this.product.quantity++
      const payload = {
        id: id,
        quantity: this.product.quantity
      }
      this.$store.dispatch('editQuantity', payload)
    },
    minus (id) {
      this.product.quantity--
      const payload = {
        id: id,
        quantity: this.product.quantity
      }
      this.$store.dispatch('editQuantity', payload)
    },
    editQuantity (id) {
      const payload = {
        id: id,
        quantity: this.product.quantity
      }
      this.$store.dispatch('editQuantity', payload)
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
