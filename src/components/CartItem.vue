<template>
  <!-- BARIS -->
  <mdb-row class="mb-3">
    <mdb-card class="w-100">
      <mdb-row>
        <!-- COL1 Gambar -->
        <mdb-col col="2" class="m-0 p-0">
          <b-img
            rounded
            height="100px"
            width="100px"
            :src="product.image_url"
            alt="Image 1"
          ></b-img
        ></mdb-col>

        <!-- COL 2 NAma dan Harga -->
        <mdb-col col="7" class="pl-5 m-auto text-left">
          <mdb-row>
            <h5>{{ product.name }}</h5>
          </mdb-row>
          <mdb-row>
            <mdb-col class="p-0">
              <h6>{{ formatPrice(product.price) }},- IDR</h6>
            </mdb-col>
            <mdb-col col="2">
              <a
                v-if="!product.onWishList"
                @click.prevent="addToWishList(product.id)"
              >
                <mdb-icon
                  v-b-tooltip.hover
                  title="Add to Wishlist"
                  icon="heart"
                  class="ml-3"
                ></mdb-icon>
              </a>
              <a
                v-if="product.onWishList"
                @click.prevent="removeFromWishList(product.id)"
              >
                <mdb-icon
                  v-b-tooltip.hover
                  title="Remove From Wishlist"
                  icon="heart"
                  class="red-text ml-3"
                ></mdb-icon>
              </a>
            </mdb-col>
            <mdb-col col="2">
              <b-icon
                type="button"
                icon="trash-fill"
                aria-hidden="true"
                @click.prevent="removeFromCart(product.id)"
              ></b-icon>
            </mdb-col>
          </mdb-row>
        </mdb-col>

        <!-- COL 3 Jumlah dan Atribut -->
        <mdb-col col="2" class="p-0 m-auto text-left">
          <b-form inline class="p-0">
            <mdb-input
              size="sm"
              class="p-0"
              type="number"
              :min="1"
              :max="product.stock"
              v-model="count"
            >
              <span class="input-group-text p-1" slot="prepend"
                >Qty</span
              ></mdb-input
            >
          </b-form>
        </mdb-col>
      </mdb-row>
    </mdb-card>
  </mdb-row>
</template>

<script>
import { mdbIcon, mdbRow, mdbCard, mdbCol, mdbInput } from "mdbvue";

export default {
  name: "CartItem",
  props: ["product"],
  data() {
    return {
      count: 1,
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

    addToWishList(id) {
      let data = {
        id: id,
        status: true,
      };
      this.$store.dispatch("addToWishList", data.id);
    },

    removeFromWishList(id) {
      let data = {
        id: id,
        status: false,
      };
      this.$store.dispatch("removeFromWishList", data.id);
    },
  
  },
  // created(){
  //   this.countCartItem()
  // },
  
  components: {
    mdbIcon,
    mdbRow,
    mdbCard,
    mdbCol,
    mdbInput,
  },
};
</script>

<style>
.title {
  min-height: 50px;
}
</style>
