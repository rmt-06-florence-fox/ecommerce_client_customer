<template>
  <div class="container">
      <div v-if="productDetails.name" class="row justify-content-center">
          <div class="col-8">
              <h1>{{ productDetails.name }}</h1>
              <div class="row">
                <div class="col-8">
                  <img :src="productDetails.image_url" class="img-fluid">
                  <button v-if="increment === false && productDetails.stock !== 0" @click="updateCart(productDetails.id)" class="btn btn-info m-3">Masukkan ke keranjang</button>
                  <button v-else style="opacity:0.3;" @click="soldWarning" class="btn btn-info m-3">Masukkan ke keranjang</button>
                  <!-- <button class="btn btn-danger m-3" @click="deleteProduct(productDetails.id)">Delete</button> -->
                  <br><small v-if="sold === true" style="color: red;">Keabisan lu bos</small>
                </div>
                <div class="konten col-4">
                  <ul class="list-group">
                    <li class="list-group-item">
                      Stock <br>
                      <small v-if="productDetails.stock === 0" style="color: red;">SOLD OUT</small>
                      <small v-else class="text-muted">{{ productDetails.stock }}</small>
                    </li>
                    <li class="list-group-item">
                      Harga <br>
                      <small class="text-muted">Rp {{ productDetails.price }}</small>
                    </li>
                  </ul>
                  <h6 class="mt-3">Jumlah produk dalam keranjang:</h6>
                  <h2>{{ count }}</h2>
                  <p v-if="increment === true" style="color:red; font-size: 12px;">semua stock telah masuk ke dalam keranjang</p>
                </div>
                <div class='form col-8' v-if="updateForm === true">
                  <form @submit.prevent="updateProduct">
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
                </div>
              </div>
          </div>
      </div>
      <div v-else>
        <h1>404 Data Not Found</h1>
      </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'Detail',
  data () {
    return {
      productDetails: {},
      updateForm: false,
      name: '',
      stock: 0,
      price: 0,
      image_url: '',
      increment: false,
      count: 0,
      sold: false
    }
  },
  methods: {
    soldWarning () {
      this.sold = true
    },
    updateCart (id) {
      // console.log(id)
      this.$store.dispatch('updateCart', id)
      this.getProductById()
    },
    updateStatus () {
      this.updateForm = true
    },
    updateProduct () {
      const obj = {
        id: this.productDetails.id,
        name: this.name,
        stock: this.stock,
        price: this.price,
        image_url: this.image_url
      }
      this.$store.dispatch('updateProduct', obj)
        .then((response) => {
          console.log(response)
          this.updateForm = false
          this.getProductById()
          // this.$router.push('/products/' + id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProductById () {
      const id = this.$route.params.id
      this.$store.dispatch('getProductById', id)
        .then((data) => {
          console.log(data)
          const product = data.data.product.Product
          if (product) {
            this.productDetails = product
            this.name = product.name
            this.stock = product.stock
            this.price = product.price
            this.image_url = product.image_url
            this.count = data.data.product.count
            if (data.data.product.count >= product.stock) {
              this.increment = true
            }
          } else {
            this.productDetails = data.data.product
            this.name = data.data.product.name
            this.stock = data.data.product.stock
            this.price = data.data.product.price
            this.image_url = data.data.product.image_url
            this.count = 0
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (id) {
      console.log('hiha')
      this.$store.dispatch('deleteProduct', id)
        .then((response) => {
          // console.log(response)
          this.$router.push('/store')
        })
        .catch(err => {
          console.log('haha')
          console.log(err)
        })
    }
  },
  created () {
    this.updateForm = false
    this.getProductById()
    // console.log(this.productDetails, ',,,,')
  }
}
</script>

<style>
.container {
  padding-bottom: 100px;
}
.form {
  padding-top: 20px
}
/* .wrapper-detail {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
img {
  width: 500px
}
.konten {
  display: flex;
  justify-content: center;
}
.list-group {
  width: 502px !important
} */
</style>
