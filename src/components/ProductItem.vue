<template>
  <div class="col-md mx-3 my-3">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top"
        :src="product.image_url"
        alt="Card image cap">
      <div class="card-body" style="height: 5rem;">
        <h5>{{ product.name }}</h5>
      </div>
      <div class="card-body">
        <table class="table table-borderless">
          <tbody>
            <tr>
              <th>Price</th>
              <td class="text-right">{{ formatPrice }}</td>
            </tr>
            <tr>
              <th>Stock</th>
              <td class="text-right">{{ product.stock }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">
                <button class="btn btn-block btn-primary" @click="addToCart">Add to Cart</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ProductItem',
  props: ['product'],
  methods: {
    addToCart () {
      if (this.$store.state.isLoggedIn) {
        const payload = {
          productId: this.product.id,
          quantity: 1
        }
        Swal.fire({
          title: 'Add to Cart',
          text: 'Item added to cart successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
          .then(_ => {
            this.$store.dispatch('addOrder', payload)
            this.$router.push('/checkout')
          })
      } else {
        this.$router.push('/users/login')
      }
    }
  },
  computed: {
    formatPrice: function () {
      return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(this.product.price)
    }
  }
}

</script>

<style>

</style>
