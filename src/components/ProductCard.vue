<template>
  <mdb-col lg="3" md="4" class="mb-lg-4 mb-4">
    <mdb-card wide ecommerce>
      <mdb-view overlay="white-slight" cascade>
        <mdb-card-image :src="product.image_url" top />
      </mdb-view>
      <mdb-card-body class="text-left" cascade>
        <a href="" class="text-muted">
          <h6>Category</h6>
        </a>

        <mdb-card-title class="title cyan-text">
          
            <h5>{{ product.name }}</h5>
        </mdb-card-title>

        <mdb-card-footer color="white" textColor="black" class="px-1">
          <sup>IDR</sup>
          <span class="float-left font-weight-bold">
            <h5>{{ formatPrice(product.price) }}</h5>
          </span>
          <span class="float-right">
            <!-- ADD TO CHART ICON -->
            <a
              v-if="!product.isAddedToCart"
              @click.prevent="addToCart(product.id)"
            >
              <mdb-icon
                v-b-tooltip.hover
                title="Add to cart"
                icon="cart-plus"
                class="grey-text ml-3"
              ></mdb-icon>
            </a>
            <a
              v-if="product.isAddedToCart"
              @click.prevent="removeFromCart(product.id)"
            >
              <mdb-icon
                v-b-tooltip.hover
                title="Remove from cart"
                icon="cart-arrow-down"
                class="blue-text ml-3"
              ></mdb-icon>
            </a>

            <!-- SHARE ICON -->
            <a>
              <mdb-icon
                v-b-tooltip.hover
                title="Share"
                slot="reference"
                icon="share-alt"
                class="grey-text ml-3"
              ></mdb-icon>
            </a>

            <!-- WISHLIST ICON -->
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
          </span>
        </mdb-card-footer>
      </mdb-card-body>
    </mdb-card>
  </mdb-col>
</template>

<script>
import {
  mdbCol,
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardFooter,
  mdbIcon,
  mdbView
} from "mdbvue";

export default {
  name: "ProductCard",
  props: ["product"],
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.dispatch("addToCart", data.id);
    },

    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.dispatch("removeFromCart", data.id);
    },

    addToWishList(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.dispatch("addToWishList", data.id);
    },

    removeFromWishList(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.dispatch("removeFromWishList", data.id);
    }
  },
  components: {
    mdbCol,
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardFooter,
    mdbIcon,
    mdbView
  }
};
</script>

<style>
.title {
  min-height: 50px;
}
</style>
