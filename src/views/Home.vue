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
            <v-col cols="12" sm="4">
              <v-select class="pa-0" style="margin-bottom: -20px;" outlined dense></v-select>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" v-for="product in products" :key="product.id">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    :src="product.image_url"
                    class="blue--text align-end"
                    aspect-ratio="16/9"
                    height="200px"
                  >
                    <v-card-title>{{ product.Category.name }}</v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn v-if="hover" href="/product" class="" outlined><v-icon>mdi-cart-plus</v-icon></v-btn>
                      </div>

                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div><a href="/product" style="text-decoration: none">{{product.name}}</a></div>
                    <div>Rp. {{product.price}}</div>
                    <div>Stock: {{product.stock}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
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
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      items: [
        {
          id: 2,
          name: 'Mouse'
        },
        {
          id: 1,
          name: 'Keyboard'
        }
      ]
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
