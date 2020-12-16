<template>
  <div class="my-5 mx-5">
    <mdb-row>
      <mdb-col col="12">
        <mdb-card>
          <mdb-card-body>
            <div>
              <mdb-tbl
              v-if="trans.length > 0"
              responsive>
                <mdb-tbl-head color="dark" textWhite>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                </mdb-tbl-head>
                <mdb-tbl-body>
                  <tr
                  v-for="product in trans"
                  :key="product.id">
                  <th
                  scope="row">
                    {{ new Date(product.Cart.updatedAt).toDateString() }}
                  </th>
                  <td>
                  <span class="row">
                    {{ product.name }} x {{ product.Cart.amount }} pcs
                  </span>
                  </td>
                  <td>Rp. {{ formatPrice(product.price * product.Cart.amount) }}</td>
                  </tr>
                </mdb-tbl-body>
              </mdb-tbl>
              <mdb-container
              v-else>
                No Transaction Yet
              </mdb-container>
            </div>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
export default {
  name: 'TransHistory',
  computed: {
    trans () {
      return this.$store.getters.sortTrans
    }
  },
  methods: {
    formatPrice (price) {
      return this.$store.getters.formatPrice(price)
    }
  },
  beforeCreate () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>
</style>
