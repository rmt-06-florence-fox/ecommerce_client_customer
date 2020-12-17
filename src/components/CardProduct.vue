<template>
  <div class="container-fluid">
  <div class="row">
    <div class="col-3" v-for="product in products" :key="product.id">
      <div class="card bg-dark text-white mt-4">
        <img :src="product.image_url" class="card-img" style="height: 260px">
        <div class="card-img-overlay">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Card',
  props: ['products'],
  data () {
    return {
    }
  }
}
</script>

<style>
* { box-sizing: border-box; }

body { font-family: sans-serif; }

.carousel {
  background: #111111;
}

.carousel-cell {
  width: 40%;
  height: 500px;
  margin-right: 10px;
  background: #333;
}

.carousel-cell-image {
  display: block;
  max-height: 100%;
  margin: 0 auto;
  max-width: 100%;
  opacity: 0;
  -webkit-transition: opacity 0.4s;
          transition: opacity 0.4s;
}

/* fade in lazy loaded image */
.carousel-cell-image.flickity-lazyloaded,
.carousel-cell-image.flickity-lazyerror {
  opacity: 1;
}
</style>
