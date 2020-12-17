<template>
  <div class="card is-horizontal">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="cart.Product.image_url" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{cart.Product.name}}</p>
          <p class="subtitle">Rp.{{cart.totalPrice}}</p>
        </div>
      </div>

      <div class="content">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
        <form action="">
          <button :disabled="cart.quantity===1"
            @click.prevent="decrement(cart.id)"
            :class="{ 'is-loading': isLoading }"
            class="button is-danger">
            -
          </button>
          <input
            type="number"
            v-model="cart.quantity"
            class="has-text-centered input"
            style="max-width: 100px"
          >
          <button @click.prevent="addCart(cart.Product.id)"
            class="button is-link"
            :disabled='currCart === cart.Product.stock'
            :class="{ 'is-loading': isLoading }">
            +
          </button>
        </form>
      </div>
      <button @click="destroyCart(cart.id)" class="button is-danger">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCard',
  props: [
    'cart'
  ],
  data () {
    return {
      isLoading: false,
      currCart: 0
    }
  },
  methods: {
    decrement (id) {
      this.isLoading = true
      this.$store.dispatch('decrementCart', { id: id, price: this.cart.Product.price })
        .then(response => {
          this.$store.dispatch('fetchCarts')
          this.checkChart()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    addCart (id) {
      this.isLoading = true
      this.$store.dispatch('addCart', { productId: id, price: this.cart.Product.price })
        .then(response => {
          this.$store.dispatch('fetchCarts')
          this.checkChart()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    destroyCart (id) {
      this.isLoading = true
      this.$store.dispatch('destroyCart', id)
        .then(response => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    checkChart () {
      this.currCart = 0
      this.$store.dispatch('fetchAllCart', this.cart.ProductId)
        .then(response => {
          const carts = response.data.data
          carts.forEach(cart => {
            this.currCart += cart.quantity
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.checkChart()
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
