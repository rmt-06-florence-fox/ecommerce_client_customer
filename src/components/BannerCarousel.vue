<template>
  <div>
      <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="400px"
      style="text-shadow: 1px 1px 2px #333; height: 400px"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div v-for="banner in banners" :key="banner.id">
          <b-carousel-slide :img-src="banner.imageUrl" style="height:400px"></b-carousel-slide>
      </div>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'BannerCarousel',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    fetchBanners () {
      this.$store.dispatch('fetchBanners')
    }
  },
  created () {
    this.fetchBanners()
  },
  computed: {
    banners () {
      return this.$store.state.banners.data
    }
  }
}
</script>

<style>

</style>
