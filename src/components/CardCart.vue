<template>
  <div class="card mb-3 mt-3">
        <div class="row g-0">
            <div class="col-md-4">
                <img :src="cart.Product.image_url" :alt="cart.Product.name" class="img-cart">
            </div>
            <div class="col-md-8">
                <div class="card-body p-5 mt-4">
                    <h5 class="card-title text-center">{{ cart.Product.name }}</h5>
                    <h5 class="card-title text-center">{{ convertMoney() }}</h5>
                        <div class="d-flex flex-row bd-highlight mb-3">
                            <div class="spinner-border text-primary " role="status" v-if="loadingCount">
                                <span class="visually-hidden"></span>
                             </div>
                            <div v-else>
                                <button class="bd-highlight mx-1 btn">-</button>
                            </div>
                            <span class="bd-highlight mx-2 mt-1">{{ cart.quantity }}</span>
                            <div class="spinner-border text-primary" role="status" v-if="loadingCount">
                                <span class="visually-hidden"></span>
                            </div>
                            <div v-else>
                                <button class="bd-highlight mx-1 btn">+</button>
                            </div>
                            <div class="spinner-border text-primary mx-5" role="status" v-if="loadingRemove">
                                <span class="visually-hidden"></span>
                            </div>
                            <div v-else>
                                <button class="bd-highlight mx-5 btn-danger btn-remove">Remove From Cart</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
  name: 'CardCart',
  props: ['cart'],
  data () {
    return {
      loadingRemove: false,
      loadingCount: false
    }
  },
  methods: {
    convertMoney () {
      const total = this.cart.Product.price * this.cart.quantity
      let thousand = total.toString().split('').reverse().join('')
      thousand = thousand.match(/\d{1,3}/g)
      thousand = thousand.join('.').split('').reverse().join('')
      return `Rp.${thousand},-`
    }
  }
}
</script>

<style scoped>
  .card{
      width: 85%;
  }
  .btn-remove:hover{
      background-color: white;
      color: red;
  }
  .img-cart{
      width: 100%;
      height: 100%;
  }
  .btn-remove{
      overflow: hidden;
  }
</style>
