<template>
  <div class="card m-2" style="width: 18rem;">
    <img class="card-img-top" :src="product.image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{product.name}}</h5>
      <p class="card-text">{{formatRupiah(product.price) }}</p>
      <div class="stock">
        <p class="card-text m-2" v-if="product.stock > 0" >Stock: {{product.stock}}</p>
        <p class="card-text m-2" v-if="product.stock == 0" >Stock Not Available</p>
      </div>
      <img src="../assets/heart2.svg" @click="like(product.id)" alt="" class="bottom-left-icon">
      <div class="action-button">
        <button class="btn-danger" @click="addProducToCart(product.id)" v-if="loginStatus">Add to cart</button>
      </div>
      <img v-if="product.stock == 0" class="sold-out" src="../assets/sold-out.png">
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'product',
  props: ['product'],
  data () {
    return {
      loginStatus: localStorage.access_token
    }
  },
  components: {
  },
  methods: {
    deleteProduct (product) {
      Swal.fire({
        title: 'Are You Sure Want To Delete?' + product.name,
        showDenyButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('delete success')
          this.$store.dispatch('deleteProduct', product.id)
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved')
        }
      })
    },
    increaseStock (product) {
      const newStock = product.stock++
      const payload = {
        id: product.id,
        stock: newStock
      }
      this.$store.dispatch('increaseStock', payload)
    },
    decreaseStock (product) {
      const newStock = product.stock--
      const payload = {
        id: product.id,
        stock: newStock
      }
      this.$store.dispatch('decreaseStock', payload)
    },
    formatRupiah (number) {
      const numberString = number.toString()
      const jumlahSisa = numberString.length % 3
      const angkaAwalString = numberString.substr(0, jumlahSisa)
      const ribuan = numberString.substr(jumlahSisa).match(/\d{3}/g)

      if (ribuan) {
        const separator = jumlahSisa ? '.' : '' // kalau ada sisa, tambahkan separator
        return 'Rp. ' + angkaAwalString + separator + ribuan.join('.')
      } else {
        return `Rp. ${angkaAwalString}`
      }
    },
    addProducToCart (id) {
      this.$store.dispatch('addProductToCart', id)
    },
    like (id) {
      this.$store.dispatch('like', id)
    }
  }
}
</script>

<style>
.card-img-top {
  height: 13rem;
}
.stock {
  display: flex;
  justify-content: center;
}
.action-button {
  display: flex;
  justify-content: center;
  margin-top: 1rem ;
}
.card-body h5 {
  font-size: 1.5rem;
  font-weight: bold;
}
.sold-out {
  width: 11vw;
  position: absolute;
  top: 0;
  left: 0;
}
.bottom-left-icon {
  width: 10%;
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
  cursor:pointer;
}
</style>
