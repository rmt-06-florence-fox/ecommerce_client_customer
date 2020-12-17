<template>
  <div class="column is-one-fifth">
    <div class="card card-equal-height">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="product.image_url" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-5">{{product.name}}</p>
          </div>
        </div>

        <div class="content">
          <table class="table is-bordered is-hoverable is-narrow">
            <tbody class="is-size-6">
              <tr>
                <th>Price</th>
                <td>{{product.price}}</td>
              </tr>
              <tr>
                <th>Stock</th>
                <td>{{product.stock}}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <footer class="card-footer">
        <button @click.prevent="addCart(product.id)"
          href="#" class="card-footer-item button is-info"
          :disabled='currCart === product.stock || product.stock === 0'
          :class="{'is-loading': isLoading}">
          Add To Cart
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: [
    'product'
  ],
  data () {
    return {
      isLoading: false,
      isAvailable: true,
      currCart: 0
    }
  },
  methods: {
    addCart (id) {
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'Login' })
      }
      this.isLoading = true
      this.$store.dispatch('addCart', { productId: id, price: this.product.price })
        .then(response => {
          this.$store.dispatch('fetchCarts')
          this.$store.dispatch('fetchProducts')
          this.checkChart()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    destroy (id) {
      this.$store.dispatch('destroy', id)
    },
    checkChart () {
      this.currCart = 0
      this.$store.dispatch('fetchAllCart', this.product.id)
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
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  created () {
    this.checkChart()
  }
}
</script>

<style scoped>
  .card-content {
    height: 100%;
  }

  .card-equal-height {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .card-equal-height .card-footer {
    margin-top: auto;
  }

  .card{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 0.5rem;
  }
</style>
