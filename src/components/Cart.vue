<template>
  <div id="cart">
    <div uk-alert v-if="error">
      <a class="uk-alert-close" uk-close></a>
      <h3>Notice</h3>
      <p>{{ error }}</p>
    </div>
    <table class="uk-table uk-table-divider uk-table-middle">
      <thead>
        <tr>
            <th class="uk-table-expand">Product Image</th>
            <th class="uk-table-expand">Product Name</th>
            <th class="uk-table-expand">Product Price</th>
            <th class="uk-table-expand">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
            <td><img id="product-image" :src="item.Product.image_url" alt="" width="300px" height="200px" uk-img></td>
            <td>{{ item.Product.name }}</td>
            <td>{{ toRupiahs(item.Product.price) }}</td>
            <td>
              <a class="action" href="#" @click.prevent="amountDecrement(item.amount, item.Product)"><span uk-icon="minus"></span></a>
              <span id="item-amount">{{ item.amount }}</span>
              <a class="action" href="#" @click.prevent="amountIncrement(item.amount, item.Product)"><span uk-icon="plus"></span></a>
            </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total: </td>
          <td></td>
          <td>{{ totalPrice }}</td>
          <td><button @click="checkout" class="uk-button">Checkout</button></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  data () {
    return {
      error: ''
    }
  },
  methods: {
    toRupiahs (rp) {
      let rupiah = ''
      const angkarev = rp.toString().split('').reverse().join('')
      for (var i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
    },
    amountDecrement (amount, product) {
      if (amount > 1) {
        this.$store.dispatch('decrementAmount', product.id)
          .then(result => {
            this.$store.dispatch('getCart')
          })
          .catch(err => {
            console.log(err.response)
          })
      } else {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this! But you can pick it again at dashboard.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'black',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, remove!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('removeFromCart', product.id)
              .then(result => {
                this.$store.dispatch('getCart')
              })
              .catch(err => {
                console.log(err.response)
              })
            Swal.fire(
              'Removed!',
              'An item has been removed from cart.',
              'success'
            )
          }
        })
      }
    },
    amountIncrement (amount, product) {
      if (amount === product.stock) {
        this.error = "You cannot buy item for more than it's available stock"
        setTimeout(() => { this.error = '' }, 3000)
      } else {
        this.$store.dispatch('incrementAmount', product.id)
          .then(result => {
            this.$store.dispatch('getCart')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(result => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Checkout successfully'
          })
          this.$store.dispatch('getCart')
          this.$store.dispatch('getProducts')
          this.$store.dispatch('getWishlist')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    totalPrice () {
      let priceCounter = 0
      this.cart.forEach(element => {
        priceCounter += (element.Product.price * element.amount)
      })
      return this.toRupiahs(priceCounter)
    }
  }
}
</script>

<style scoped>
#cart {
  margin-left: 220px;
  width: 100%;
}
#item-amount {
  margin: 0 10px;
}
.action {
  text-decoration: none;
  color: black;
}
.action:hover {
  color: #ff9966;
  transition: 300ms;
}
.uk-table-expand {
  text-align: center;
}
.uk-button {
  background-color: black;
  color: white;
  font-family: 'Alfa Slab One', cursive;
}
.uk-button:hover {
  background-color: #ff9966;
  color: black;
  transition: 300ms;
}
</style>
