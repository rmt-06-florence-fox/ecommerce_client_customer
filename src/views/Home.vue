<template>
  <div class="home">
    <v-carousel>
      <v-carousel-item
        src="https://www.box.co.uk/Images/logimat-banner-q4-FP_2011131140.jpg"
      >
      </v-carousel-item>
      <v-carousel-item
        src="https://m.media-amazon.com/images/S/aplus-media/vc/a6f2a8b7-14a8-4e3b-b68e-8ab1db1a22c5.__CR1,0,1898,587_PT0_SX970_V1___.jpg"
      >
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <div class="row">
        <!-- FILTER CATEGORY -->
        <div
          class="col-md-3 col-sm-3 col-xs-12"
        >
          <v-card>
            <v-card-title>Filters</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview :items="categories" :open="[1]" :active="[5]" :selected-color="'#fff'" activatable open-on-click dense></v-treeview>
            </template>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >
          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-12 of 200 products</small>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" v-for="product in products" :key="product.id">
              <ProductCard
                :product="product"
              >
              </ProductCard>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-12">
        <v-pagination
          :length="6"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductCard from '../components/ProductCard'
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getCategories')
  },
  computed: mapState(['products', 'categories'])
}
</script>

<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>
