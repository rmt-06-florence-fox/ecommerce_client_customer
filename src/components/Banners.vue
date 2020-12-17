<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <ol class="carousel-indicators">
        <li v-for='(banner,i) in banners' :key="i" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="i" style="cursor:text !important;"></li>
        <!-- <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></li> -->
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item" v-for="(banner,i) in banners" :key="i" :class="i===0 ? 'active': ''">
        <img :src="banner.image_url" class="d-block w-100" alt="" style="height: 500px; object-fit: cover;">
        <div class="carousel-caption d-none d-md-block">
            <h5>{{ banner.title }}</h5>
        </div>
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </a>
    </div>
</template>

<script>
export default {
  name: 'Banner',
  created () {
    this.$store.dispatch('fetchBanners')
  },
  computed: {
    banners () {
      return this.$store.getters.filteredBanners
    }
  },
  methods: {
    getBanners () {
      console.log(this.banners)
    }
  }
}
</script>

<style>

</style>
