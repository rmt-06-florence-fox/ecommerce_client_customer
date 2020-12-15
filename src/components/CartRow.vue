<template>
  <div class="cart_items">
  <!-- <router-link to="/detail/"> -->
      <ul class="cart_list">
          <li class="cart_item clearfix mt-2">
              <div class="cart_item_image"><img :src="product.Product.image_url" alt=""></div>
              <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between align-items-center">
                  <div class="cart_item_name cart_info_col">
                      <div class="cart_item_title">Nama</div>
                      <div class="cart_item_text">{{ product.Product.name }}</div>
                  </div>
                  <div class="cart_item_quantity cart_info_col">
                      <div class="cart_item_title">Jumlah</div>
                      <div class="cart_item_text">
                        <i v-if="product.count > 0" @click="decrement(product.id)" class="fa fa-minus-square-o mr-2" aria-hidden="true"></i>
                        <i v-else style="opacity:0.5;" class="fa fa-minus-square-o mr-2" aria-hidden="true"></i>
                          {{ product.count }}
                        <i v-if="product.count < product.Product.stock" @click="increment(product.ProductId)" class="fa fa-plus-square-o ml-2" aria-hidden="true"></i>
                        <i v-else style="opacity:0.5;" class="fa fa-plus-square-o ml-2" aria-hidden="true"></i>
                      </div>
                  </div>
                  <div class="cart_item_price cart_info_col">
                      <div class="cart_item_title"><p class="white" style="opacity:0;">space</p></div>
                      <div class="cart_item_text">X</div>
                  </div>
                  <div class="cart_item_price cart_info_col">
                      <div class="cart_item_title" style="opacity:0">Harga</div>
                      <div class="cart_item_text">{{ product.Product.price }}</div>
                  </div>
                  <div class="cart_item_price cart_info_col">
                      <div class="cart_item_title">Harga</div>
                      <div class="cart_item_text">Rp {{ product.Product.price * product.count }}</div>
                  </div>
                  <div class="cart_item_price cart_info_col row align-items-center">
                      <div>
                      <i @click="deleteCart(product.id)" class="fa fa-trash fa-4x ml-4" style="color: red;" aria-hidden="true"></i>
                      </div>
                  </div>
              </div>
          </li>
      </ul>
  <!-- </router-link> -->
  </div>
</template>

<script>
export default {
  props: ['product'],
  created () {
    this.$store.dispatch('getCarts')
  },
  methods: {
    decrement (id) {
      this.$store.dispatch('decrement', id)
        .then(response => {
          console.log('added to cart')
          this.$store.dispatch('getCarts')
          // this.$router.push('/cart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
      // location.reload()
    },
    increment (id) {
      // console.log(id)
      this.$store.dispatch('updateCart', id)
        .then(response => {
          console.log('added to cart')
          this.$store.dispatch('getCarts')
          // this.$router.push('/cart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    goDetail (id) {
      console.log(id)
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style>

</style>
