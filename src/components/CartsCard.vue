<template>
  <div>
    <!-- <p>{{ new Intl.NumberFormat('ID').format(item.price) }}</p> -->
    <div>
      <!-- <p>{{ item.price.toLocaleString('id') }} disini</p> -->
        <b-card no-body class="overflow-hidden" style="max-width: 540px; height: 150px">
            <b-row no-gutters>
            <b-col md="6">
                <b-card-img :src="item.imageUrl" alt="Image" class="rounded-0"
                    style="height:150px"
                ></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body>
                  <h4 class="text-left mb-3"><strong>{{ item.name }}</strong></h4>
                  <h6 class="text-left mb-3"><strong>Rp {{ new Intl.NumberFormat('ID').format(item.price) }} @each</strong></h6>
                  <div v-for="(product, i) in products" :key="i">
                      <div v-if="product.id === item.ProductId && item.quantity >= product.stock">
                        <h6 class="text-left"><button class="mr-2 btn btn-primary p-1" @click="decrementItem(item)"><i class="fa fa-minus" style="font-size:15px"></i></button><strong>{{ item.quantity }}</strong><button disabled class="ml-2 btn btn-primary p-1" @click="addCart(item)"><i class="fa fa-plus " style="font-size:15px"></i></button><button class="ml-3 btn btn-danger" @click="removeCart(item.id)">Remove cart</button></h6>
                      </div>
                      <div v-else-if="product.id === item.ProductId">
                        <h6 class="text-left"><button class="mr-2 btn btn-primary p-1" @click="decrementItem(item)"><i class="fa fa-minus" style="font-size:15px"></i></button><strong>{{ item.quantity }}</strong><button class="ml-2 btn btn-primary p-1" @click="addCart(item)"><i class="fa fa-plus " style="font-size:15px"></i></button><button class="ml-3 btn btn-danger" @click="removeCart(item.id)">Remove cart</button></h6>
                      </div>
                  </div>
                </b-card-body>
            </b-col>
            </b-row>
        </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartsCard',
  props: ['item', 'products'],
  data () {
    return {
    }
  },
  methods: {
    addCart (item) {
      this.$store.dispatch('addCart', {
        ProductId: item.ProductId
      })
        .then(data => {
          console.log('berhasil ditambahkan di carts card')
          this.$store.dispatch('fetchCart')
            .then(({ data }) => {
              this.$store.commit('setCart', data)
              this.$store.commit('setUpdatePrice', true)
              let total = 0
              data.forEach(el => {
                total += el.quantity * el.price
              })
              this.$store.commit('setCurrentPrice', total)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
        .then(({ data }) => {
          this.$store.commit('setCart', data)
          data.forEach(el => {
            this.$store.commit('addTotalPrice', el.quantity * el.price)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    decrementItem (item) {
    //   console.log(item.quantity)
      if (item.quantity === 1) {
        this.$store.dispatch('destroyCart', item.id)
          .then(_ => {
            this.$store.dispatch('fetchCart')
              .then(({ data }) => {
                this.$store.commit('setCart', data)
                this.$store.commit('setUpdatePrice', true)
                let total = 0
                data.forEach(el => {
                  total += el.quantity * el.price
                })
                this.$store.commit('setCurrentPrice', total)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$store.dispatch('decrementItem', item)
          .then(data => {
            console.log('berhasil dikurangi di carts card')
            this.$store.dispatch('fetchCart')
              .then(({ data }) => {
                this.$store.commit('setCart', data)
                this.$store.commit('setUpdatePrice', true)
                let total = 0
                data.forEach(el => {
                  total += el.quantity * el.price
                })
                this.$store.commit('setCurrentPrice', total)
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    removeCart (id) {
      // console.log('masuk', id)
      this.$store.dispatch('destroyCart', id)
        .then(_ => {
          this.$store.dispatch('fetchCart')
            .then(({ data }) => {
              this.$store.commit('setCart', data)
              this.$store.commit('setUpdatePrice', true)
              let total = 0
              data.forEach(el => {
                total += el.quantity * el.price
              })
              this.$store.commit('setCurrentPrice', total)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
