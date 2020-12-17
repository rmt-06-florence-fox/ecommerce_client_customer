<template>
<div >
 <div class="container mt-3 mb-3">
    <b-carousel
      class="carousel"
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        class="banner"
        v-for="(banner, i) in getBanner " :key="i"
        :caption="banner.title"
        :img-src="banner.image_url"
      >
      <b-img></b-img>
      </b-carousel-slide>
    </b-carousel>
  </div>
</div>
</template>

<script>
export default {
  name: 'Banner',
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
    }
  },
  computed: {
    getBanner () {
      return this.$store.state.banners
    }
  },
  created () {
    this.$store.dispatch('fetchBanner')
  }
}
</script>

<style scoped>
/* .banner {
    height: 40vw;
} */
</style>
