<template>
  <div id="MyCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(banner, i) in banners" :key="banner.id" class="carousel-item" :class="i === 0 ? 'active' : ''">
          <img :src="banner.image_url" alt="slide" height="500px" class="d-block w-100">
        </div>
      </div>
      <a class="carousel-control-prev" href="#MyCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#MyCarousel" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
      </a>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  created () {
    this.$store.dispatch('getBanners')
  }
}
</script>

<style scoped>
.carousel .carousel-item {
  height: 500px;
}

.carousel-item img {
  position: absolute;
  object-fit: contain;
  top: 0;
  left: 0;
}
</style>
