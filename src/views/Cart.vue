<template>
  <div class="col-12">
      <div v-if="allProducts.length !== 0" class="cart_title mt-5">Keranjang</div>
      <div class="cart_section">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <div class="cart_container">
                  <div v-if="allProducts.length === 0" class="mb-5">
                    <i class="fa fa-shopping-cart fa-5x" aria-hidden="true"></i>
                    <h1 >Kosong ni</h1>
                    <h5>Silakan liat-liat dulu produk kami</h5>
                  </div>
                    <!-- <div v-if="addForm === false" @click="addFormStatus" class="cart_buttons"><button type="button" class="button cart_button_checkout">Tambah Produk</button></div>
                    <div class='col-12 m-5' v-if="addForm === true">
                      <form @submit.prevent="addProduct">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Nama</label>
                          <input v-model="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nama produk">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Stock</label>
                          <input v-model="stock" type="text" class="form-control" id="exampleInputPassword1" placeholder="Jumlah produk">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Harga</label>
                          <input v-model="price" type="text" class="form-control" id="exampleInputPassword1" placeholder="Harga produk">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Foto</label>
                          <input v-model="image_url" type="text" class="form-control" id="exampleInputPassword1" placeholder="Link gambar">
                        </div>
                        <button type="submit" class="btn btn-primary">Tambahkan</button>
                      </form>
                        <p @click="addFormStatusFalse" class="col-12 m-2">cancel</p>
                    </div> -->
                    <!-- benerin -->
                    <CartRow v-for="product in allProducts" :key="product.id" :product="product"></CartRow>
                    <div v-if="allProducts.length !== 0" class="cart_item_price cart_info_col mt-4 mr-3">
                      <div class="cart_item_title">Total harga:</div>
                      <div class="cart_item_text mt-0">Rp {{ price }}</div>
                      <button @click="checkout" class="btn btn-primary mt-2">Checkout</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import CartRow from '../components/CartRow'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      totalPrice: 100
    }
  },
  methods: {
    checkout () {
      for (let i = 0; i < this.allProducts.length; i++) {
        const product = this.allProducts[i]
        // console.log(product.count)
        // console.log(product.Product.stock)
        // console.log('haha')
        const newStock = product.Product.stock - product.count
        // console.log(newStock)
        const obj = {
          id: product.Product.id,
          name: product.Product.name,
          stock: newStock,
          price: product.Product.price,
          image_url: product.Product.image_url
        }
        console.log(obj.id)
        this.$store.dispatch('updateProduct', obj)
        this.$store.dispatch('deleteCart', product.id)
      }
    }
  },
  computed: {
    ...mapState(['allProducts', 'price'])
  },
  components: {
    CartRow
  },
  created () {
    this.$store.dispatch('getCarts')
    console.log(this.allProducts)
  }

}
</script>

<style>

</style>
