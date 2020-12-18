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
                <mdb-tbl-head color="#rgba(76, 175, 80, 0.7) rgba-green-strong" textWhite>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Total</th>
                  </tr>
                  <!-- {{trans}} -->
                </mdb-tbl-head>
                <mdb-tbl-body>
                  <tr
                  v-for="product in trans"
                  :key="product.id">
                  <th
                  scope="row">
                    {{ new Date(product.updatedAt).toDateString() }}
                  </th>
                  <td>
                  <span class="row">
                    {{ product.Product.name }} x {{ product.amount }} pcs
                  </span>
                  </td>
                  <td>Rp. {{ formatPrice(product.Product.price * product.amount) }}</td>
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
