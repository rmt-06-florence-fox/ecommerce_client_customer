<template>
  <v-container>
    <v-banner justify-center>
      <h2 class="display-1 text-center">Thank you for purchasing our products!</h2>
    </v-banner>
    <v-row>
      <v-col :cols="12" md="4" sm="12">
        <v-card class="pa-4" md="4" sm="12" elevation="5">
          <v-card-title>
            <p class="title text-center"><b>Payment Total</b></p>
          </v-card-title>
          <v-card-text>
            <p class="headline text-center"><b>{{ formatPrice(trans.total_price) }} </b></p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" md="8" sm="12">
        <v-card class="pa-4" md="8" sm="12" elevation="5">
          <v-card-title>
            <p class="title align-text-center"><b>Transaction Summary</b></p>
          </v-card-title>
          <v-simple-table>
            <tbody>
              <tr>
                <td><p class="subtitle-1"><b>Transaction Code:</b></p></td>
                <td class="text-right"><p class="subtitle-1"><b>{{ trans.code }}</b></p></td>
              </tr>
              <tr>
                <td><p class="subtitle-1 align-center">Name:</p></td>
                <td class="text-right"><p class="subtitle-1">{{ trans.name }}</p></td>
              </tr>
              <tr>
                <td><p class="subtitle-1 align-center">Address:</p></td>
                <td class="text-right"><p class="subtitle-1">{{ trans.address }}</p></td>
              </tr>
              <tr>
                <td><p class="subtitle-1 align-center">Product(s) Purchased:</p></td>
                <td class="text-right"><p class="subtitle-1">{{ trans.products }}</p></td>
              </tr>
              <tr>
                <td><p class="subtitle-1 align-center">Date Purchased:</p></td>
                <td class="text-right"><p class="subtitle-1">{{ moment(trans.createdAt).format('MMMM Do YYYY') }}</p></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters justify-center>
      <v-col cols="12" sm="4" class="d-flex justify-center">
        <v-card height="300px" max-width="250px">
          <v-img
            width="250"
            height="100"
            src="https://4.bp.blogspot.com/-wGICxxBifdQ/W_EGMAGv-mI/AAAAAAAAFB4/fOX2DdfFMpckF0boSuvZy066_lLF3hkBwCLcBGAs/s1600/BCA.png"
          >
          </v-img>
          <v-card-title class="text-center">Transfer to BCA</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex justify-center">
        <v-card height="300px" max-width="250px">
          <v-img
            width="250"
            height="100"
            src="https://cdn.ayobandung.com/upload/bank_image/medium/polisi-periksa-12-saksi-kasus-pembobolan-bni.jpg"
          >
          </v-img>
          <v-card-title class="text-center">Transfer to BNI</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="d-flex justify-center">
        <v-card height="300px" max-width="250px" >
          <v-img
            width="250"
            height="100"
            src="https://www.pngitem.com/pimgs/m/12-122575_bank-mandiri-logo-bank-mandiri-vector-hd-png.png"
          >
          </v-img>
          <v-card-title class="text-center">Transfer to Mandiri</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    this.$store.dispatch('getOneTransaction', this.$route.params.id)
  },
  methods: {
    formatPrice (price) {
      let result = ''
      const strPrice = String(price)
      for (let i = 0; i < strPrice.length; i++) {
        if ((strPrice.length - i) % 3 === 0 && i !== 0) {
          result += ',' + strPrice[i]
        } else {
          result += strPrice[i]
        }
      }
      return `Rp. ${result}`
    }
  },
  computed: mapState(['trans'])
}
</script>

<style>

</style>
