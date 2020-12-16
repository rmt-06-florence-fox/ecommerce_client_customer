<template>
  <mdb-col lg="3" md="4" class="mb-lg-4 mb-4">
    <mdb-card wide ecommerce>
      <mdb-view overlay="white-slight" cascade>
        <mdb-card-image
          :src="product.image_url"
          top
        />
      </mdb-view>
      <mdb-card-body class="text-left" cascade>
        <a href="" class="text-muted">
          <h6>Category</h6>
        </a>

        <mdb-card-title class="title">
          <a href=""
            ><h5>{{ product.name }}</h5></a
          >
        </mdb-card-title>

        <mdb-card-footer color="white" textColor="black" class="px-1">
          <sup>IDR</sup>
          <span class="float-left font-weight-bold">
            <h5>{{formatPrice(product.price)}}</h5>
          </span>
          <span class="float-right">
            <a>
              <mdb-tooltip trigger="hover" :options="{ placement: 'top' }">
                <div class="tooltip">Add to cart</div>
                <mdb-icon
                  slot="reference"
                  icon="shopping-cart"
                  class="grey-text ml-3"
                ></mdb-icon>
              </mdb-tooltip>
            </a>
            <a>
              <mdb-tooltip trigger="hover" :options="{ placement: 'top' }">
                <div class="tooltip">Share</div>
                <mdb-icon
                  slot="reference"
                  icon="share-alt"
                  class="grey-text ml-3"
                ></mdb-icon>
              </mdb-tooltip>
            </a>
            <a class="active">
              <mdb-tooltip
                trigger="hover"
                class="active"
                :options="{ placement: 'top' }"
              >
                <div class="tooltip">Added to watchlist</div>
                <mdb-icon slot="reference" icon="heart" class="ml-3"></mdb-icon>
              </mdb-tooltip>
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
  mdbTooltip,
  mdbView,
} from "mdbvue";

export default {
  name: "ProductCard",
  props: ["product"],
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  components: {
    mdbCol,
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardFooter,
    mdbIcon,
    mdbTooltip,
    mdbView,
  },
};
</script>

<style>
.title {
  min-height: 50px;
}
</style>
