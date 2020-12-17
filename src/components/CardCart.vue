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
                                <button class="bd-highlight mx-1 btn" @click="minCart">-</button>
                            </div>
                            <span class="bd-highlight mx-2 mt-1">{{ cart.quantity }}</span>
                            <div class="spinner-border text-primary" role="status" v-if="loadingCount">
                                <span class="visually-hidden"></span>
                            </div>
                            <div v-else>
                                <button class="bd-highlight mx-1 btn" @click="plusCart">+</button>
                            </div>
                            <div class="spinner-border text-primary" role="status" v-if="loadingRemove">
                                <span class="visually-hidden"></span>
                            </div>
                            <div v-else>
                                <button class="bd-highlight btn-danger btn-remove" @click="removeCart">Remove From Cart</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import swal from 'sweetalert'
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
    },
    removeCart () {
      swal({
        title: 'Are you Sure?',
        text: 'You will delted this product permanently',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            this.loadingRemove = true
            this.$store.dispatch('deleteCart', this.cart.id)
              .then(value => {
                swal({
                  text: 'Cart has been deleted',
                  title: 'Yeay',
                  icon: 'success'
                })
                this.$store.dispatch('fetchCart')
                  .then(value => {
                    this.$store.commit('set_carts', value.data.cart)
                    this.$store.commit('set_totalPrice', value.data.totalPrice)
                  })
                // this.cart = null
                // this.$router.push('/')
              })
              .catch(err => {
                swal('Error', `${err.response.data}`)
              })
          } else {
            swal('Your Product is save!')
          }
        })
        .finally(() => {
          this.loadingRemove = false
        })
    },
    plusCart () {
      this.loadingCount = true
      const obj = {
        quantity: +1,
        ProductId: this.cart.Product.id
      }
      this.$store.dispatch('patchCart', obj)
        .then(value => {
          // this.cart = value.data
          console.log(value.data, '<<<<<<<<<<')
          return this.$store.dispatch('fetchCart')
        })
        .then(value => {
          console.log(value.data, '<<<< ini dari value data')
          this.$store.commit('set_carts', value.data.cart)
          this.$store.commit('set_totalPrice', value.data.totalPrice)
        })
        .catch(err => {
          swal('Error', `${err.response.data}`)
        })
        .finally(() => {
          this.loadingCount = false
        })
    },
    minCart () {
      this.loadingCount = true
      const obj = {
        quantity: -1,
        ProductId: this.cart.Product.id
      }
      this.$store.dispatch('patchCart', obj)
        .then(value => {
          // this.cart = value.data
          console.log(value.data, '<<<<<<<<<')
          this.$store.commit('set_carts', value.data)
        })
        .catch(err => {
          swal('Error', `${err.response.data}`)
        })
        .finally(() => {
          this.loadingCount = false
        })
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
      margin-left: 50px;
  }
</style>
