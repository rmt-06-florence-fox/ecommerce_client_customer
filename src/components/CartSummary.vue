<template>
  <section class="text-center">
    <mdb-row>
      <mdb-col>
        <mdb-card
          class="card-image"
          style="background-image: url('../assets/logo.png')"
        >
          <div
            class="text-white text-center pricing-card d-flex align-items-center rgba-teal-strong py-3 px-3 rounded"
          >
            <mdb-card-body>
              <h4>Total</h4>
              <hr />
              <div class="price pt-2">
                <h2 class="number mb-0">{{ formatPrice(totalPrice) }},- IDR</h2>
              </div>
              <div class="ml-4 mt-5">
                <h5 class="text-left">Details:</h5>
                <!-- {{countItem}} -->
                <hr />
              </div>
              <ul>
                <li
                  class="text-left"
                  v-for="(product, i) of productsAddedToCart"
                  :key="i"
                >
                  <h6><strong> :: </strong>{{ product.name }}</h6>
                  <a
                    >{{ formatPrice(product.price) }},- IDR x {{ 1 }} =
                    {{ formatPrice(product.price * 1) }},- IDR</a
                  >
                  <hr />
                </li>
              </ul>
              <div class="d-flex flex-row justify-content-around">
                <div class="d-flex flex-column ml-4 col-sm-6 my-auto">
                  <a @click.prevent="removeCart"
                    ><h5 class="text-left">x Remove All</h5></a
                  >
                </div>
                <div class="d-flex flex-column ml-4 col-sm-6">
                  <mdb-btn outline="white" color="white">Checkout</mdb-btn>
                </div>
              </div>
            </mdb-card-body>
          </div>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbBtn } from "mdbvue";

export default {
  name: "CartSummary",
  data() {
    return {
      totalPrice:""
    };
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false,
      };
      this.$store.dispatch("removeFromCart", data.id);
    },
    removeCart() {
      this.$store.dispatch("removeCart");
    },
    total() {
      let total = 0;
      this.productsAddedToCart.forEach((product) => {
        total += product.price;
      });
      this.totalPrice= total
      console.log(this.totalPrice)
    },
  },
  created(){
    this.total()
  },
  computed: {
    productsAddedToCart() {
      return this.$store.getters.productsAddedToCart;
    },
    cartCount() {
      return this.productsAddedToCart.length;
    },
    
  },

  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbBtn,
  },
};
</script>

<style>
.title {
  min-height: 50px;
}
ul {
  list-style-type: none;
}
</style>
