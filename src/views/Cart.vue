<template>
  <div class="p-5 mt-5">
  <b-container>
    <b-row>
      <b-col cols="9">
        <h1 v-if="carts.length === 0">Your cart still empty</h1>
        <CartItem
        v-for="cart in carts"
        :key="cart.id"
        :cart="cart"
        />
      </b-col>
      <b-col class="shadow p-4" style="height:250px">
        <h4>Total Payment</h4>
        <hr>
        <h4>Rp. {{ totalPayment }}</h4>
        <br><br>
        <b-button @click="checkout" class="btn btn-primary">Checkout</b-button>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>