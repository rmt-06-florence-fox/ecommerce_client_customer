<template>
  <b-carousel
    class="container h-50 w-50"
    fade
    indicators
    img-width=10
    img-height=10
  >
    <b-carousel-slide
      img-blank-color="dark"
      v-for="banner in banners"
      :key="banner.id"
      :img-src="banner.imageUrl"
    ><h2 class="banner-title">{{banner.title}}</h2></b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  name: 'BannerWrapper',
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  methods: {
    fetchBanners () {
      this.$store.dispatch('fetchBanners')
    }
  },
  created () {
    this.fetchBanners()
  }
}
</script>

<style>
.banner-title {
  background: black ;
  padding: 4px;
}
</style>
