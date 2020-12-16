<template>
    <div class="card" style="width: 18rem;">
        <img :src="product.image_url" class="card-img-top" alt="" id="img-product">
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">Stock: {{ product.stock }}</p>
            <h5 class="card-text">{{ convertMoney() }}</h5>
            <div class="spinner-border text-primary " role="status" v-if="isLoading">
                <span class="visually-hidden"></span>
            </div>
            <div v-else>
            <button class="btn btn-primary" id="btn-to-cart" @click="addCart">Add To Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
export default {
  name: 'CardProduct',
  props: ['product'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    convertMoney () {
      let thousand = this.product.price.toString().split('').reverse().join('')
      thousand = thousand.match(/\d{1,3}/g)
      thousand = thousand.join('.').split('').reverse().join('')
      return `Rp.${thousand},-`
    },
    addCart () {
      this.isLoading = true
      const obj = {
        ProductId: this.product.id
      }
      this.$store.dispatch('addCart', obj)
        .then(value => {
          swal({
            text: 'Product Has Been Added On Your Cart! Please Check Your Cart!',
            title: 'Success',
            icon: 'success'
          })
        })
        .catch(err => {
          swal('Error', err.response.data)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style>
    #btn-to-cart{
        width: 100%;
    }
    #btn-to-cart:hover{
        background-color: white;
        color: blue;
    }
    .card{
        margin: auto;
        margin-bottom: 20px;
    }
    #img-product{
        height: 15rem;
        width: 100%;
    }
</style>
