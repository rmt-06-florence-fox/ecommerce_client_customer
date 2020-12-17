<template>
  <div>
    <div class="card ml-5 mt-3 " style="width: 13rem;" id="card">
      <img :src="Cart.Product.imageUrl" class="card-img-top" style="width: 12.9rem; height: 14rem">
      <div class="card-body">
        <h5 class="card-title">{{ Cart.Product.name }}</h5>
        <p class="card-text">Rp {{ Cart.Product.price }}</p>
        <div class="row mx-auto d-flex justify-content-center" id="button-cart">
          <button @click="addQuantity" id="btn">+</button>
          <p>{{ quantity }}</p>
          <button @click="reduceQuantity" id="btn">-</button>
        </div>
        <a @click="removeCart" class="btn btn-danger" id="btn-removeCart">
          remove from cart</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      quantity: this.Cart.quantity
    }
  },
  components: {

  },
  methods: {
    removeCart () {

    },
    addQuantity () {
      const payload = {
        ProductId: this.Cart.Product.id,
        quantity: this.quantity++
      }
      this.$store.dispatch('updateCart', payload)
    },
    reduceQuantity () {
      const payload = {
        ProductId: this.Cart.Product.id,
        quantity: this.quantity--
      }
      this.$store.dispatch('updateCart', payload)
    }
  },
  props: ['Cart']
}
</script>

<style>
  #card {
    margin-bottom: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  #btn-removeCart {
    width: 10rem;
    color: white;
    cursor: pointer;
    border-radius: 0px;
  }
  #btn-removeCart:hover {
    color: black;
    background-color: white;
  }
    #btn{
       background-color: grey;
       color: black;
       border: black;
       height: 2rem;
       width: 2rem;
       margin-right: 10px;
       margin-left: 10px;
    }
    #btn:hover{
       background-color: black;
       color: white;
       transition: 0.5s;
    }
</style>
