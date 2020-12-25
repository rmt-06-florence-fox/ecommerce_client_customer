<template>
  <div class="cart_items">
  <!-- <router-link to="/detail/"> -->
      <ul class="cart_list detail" @click="goDetail(product.id)">
          <li class="cart_item clearfix">
              <div class="cart_item_image"><img :src="product.image_url" alt=""></div>
              <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                  <div class="cart_item_name cart_info_col">
                      <div class="cart_item_title">Nama</div>
                      <div class="cart_item_text">{{ product.name }}</div>
                  </div>
                  <div class="cart_item_quantity cart_info_col">
                      <div class="cart_item_title">Stock</div>
                      <div v-if="product.stock !==0" class="cart_item_text">{{ product.stock }}</div>
                      <div v-else class="cart_item_text">
                        <h6 style="color:red;">
                        SOLD OUT
                        </h6>
                      </div>
                  </div>
                  <div class="cart_item_price cart_info_col">
                      <div class="cart_item_title">Harga</div>
                      <div class="cart_item_text">Rp {{ productPrice}}</div>
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
  computed: {
    productPrice () {
      const harga = `${this.product.price}`
      console.log(harga)
      const reversed = harga.split('').reverse()
      for (let i = 0; i < reversed.length; i++) {
        if (i % 4 === 0) {
          reversed.splice(i, 0, '.')
        }
      }
      reversed.shift()
      return reversed.reverse().join('')
    }
  },
  methods: {
    goDetail (id) {
      console.log(id)
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style>

</style>
