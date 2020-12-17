<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Your Cart</h1>
      <div class="columns">
        <div class="column">
          <CartCard
            v-for="cart in carts" :key="cart.id"
            :cart="cart"
          />
        </div>
        <div class="column">
          <h1 class="title">Cart Total</h1>
          <h3 class="subtitle">Rp.{{total}}</h3>
          <button :class="{'is-loading': isLoading}" @click.prevent="checkout()" v-if="total !== 0" class="button is-link">Checkout</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CartCard from '../components/CartCard'
import Swal from 'sweetalert2'

export default {
  name: 'Cart',
  components: {
    CartCard
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total () {
      return this.$store.state.total
    }
  },
  methods: {
    checkout () {
      console.log('click checkout')
      this.isLoading = true
      this.$store.dispatch('checkout')
        .then(response => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Checkout Success',
            showConfirmButton: false,
            timer: 500
          })
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          this.isLoading = false
        })
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>
<style scoped>
  .card {
    margin-bottom: 20px;
  }

  .is-horizontal {
    flex-direction: row;
    display: flex;
    flex-basis: 50ex ;
    flex-grow: 0;
    flex-shrink: 1;
  }

  .card-image {
    flex: 2;
    flex-shrink: 2;
  }

  .image {
    display: block;
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .card-content {
    flex: 3;
    flex-shrink: 3;
  }
</style>
