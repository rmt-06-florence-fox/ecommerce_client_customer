<template>
  <div><br>
    <b-container class="bv-example-row" style="margin-top: 70px">
      <b-row>
        <b-col>
          <b-card title="- List Cart -" style="width: 745px;">
            <div>
              <b-card no-body class="overflow-auto shadow-lg" style="width: 700px; height: 61.85vh; background-color: rgba(202, 252, 21, 0.145);">
                <CardCart
                :carts = 'carts'
                ></CardCart>
              </b-card>
            </div>
          </b-card>
        </b-col>
        <b-col>
          <!-- card harga total -->
          <b-card no-body class="overflow-hidden" style="margin-bottom: 10px;"><br>
            <b>Total Price</b><hr style="width: 60%; margin-top: 10px; margin-left: 55px">
            <p>{{ total | currency }}</p>
          </b-card>
          <!-- card harga total -->
          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Checkout</button>
            <button class="btn btn-warning" type="button">cancel all</button>
            <button class="btn btn-info" type="button" @click="goHome()">back to buy</button>
          </div>
        </b-col>
      </b-row>
    </b-container>
      <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer'
import CardCart from '../components/CardCart'

export default {
  name: 'Cart',
  data () {
    return {
    }
  },
  components: {
    Footer,
    CardCart
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
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    goHome () {
      this.$router.push({ name: 'Home' })
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
