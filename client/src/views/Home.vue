<template>
  <div class="container">
    <div class="row">
      <div class="card" style="width: 18rem;"
        v-for="item in allProducts" :key="item.id"
      >
          <img :src="item.image_url" class="card-img-top" :alt="item.name">
          <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Rp. {{item.price}}</li>
              <li class="list-group-item">{{item.stock}} items</li>
            </ul>
            <a href="#" class="btn btn-primary" @click.prevent="addChart(item.id)">Add To Chart</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.$store.dispatch('gelAllProducts')
    this.$store.dispatch('getAllCharts')
  },
  computed: {
    allProducts () {
      return this.$store.state.products
    }
  },
  methods: {
    addChart (id) {
      this.$store.dispatch('addToChart', id)
    }
  }
}
</script>
