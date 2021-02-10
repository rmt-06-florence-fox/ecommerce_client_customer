<template>
<div class="p-3">
<div class="card" style="width: 18rem;">
    <img class="card-img-top image-box" :src="cart.Product.image_url" alt="Card image cap">
    <div class="card-body" style="background-color: #B8F0F0;">
        <h2>{{cart.Product.name}}</h2>
        <h6>Total: {{cart.quantity * cart.Product.price}}</h6>
        <div class="card-text mt-3">
        <button  @click="updateCart(cart.id, 'remove')" v-if="cart.quantity > 1" class="btn" style="background-color: #68dede;">-</button>
        <button v-if="cart.quantity <= 1" class="btn" style="background-color: #68dede;" disabled>-</button>
        {{cart.quantity}}
        <button @click="updateCart(cart.id, 'add')" v-if="cart.quantity < cart.Product.stock" class="btn" style="background-color: #68dede;" >+</button>
        <button v-if="cart.quantity === cart.Product.stock" class="btn" style="background-color: #68dede;" disabled>+</button>
        </div>
        <button @click="removeCart(cart.id)" class="btn btn-danger mt-3">Remove</button>
    </div>
</div>
</div>
</template>

<script>
export default {
  props: ['cart'],
  methods: {
    updateCart (cartId, addOrRemove) {
      const payload = {
        cartId,
        addOrRemove
      }
      this.$store.dispatch('updateCart', payload)
    },
    removeCart (cartId) {
      this.$store.dispatch('removeCart', cartId)
    }
  }
}
</script>

<style>
.image-box {
      max-width: 286px;
      max-height: 180px;
      min-width: 286px;
      min-height: 180px;
  }
</style>
