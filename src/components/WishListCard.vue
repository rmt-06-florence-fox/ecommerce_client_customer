<template>
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
        <img :src="wish.Product.image" width="200px" alt="">
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">{{ wish.Product.name }}</h5>
            <p class="card-text">{{ wish.Product.description }}</p>
            <p class="card-text"><small class="text-muted">{{ wish.Product.price }}</small></p>
            <button @click="destroy(wish.id)" class="btn btn-danger">remove from wishlist</button>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WishList',
  props: ['wish'],
  created () {
    if (localStorage.access_token) {
      this.$store.commit('SET_LOGIN', true)
    }
  },
  methods: {
    destroy (id) {
      this.$store.dispatch('deleteWish', id)
        .then(() => {
          this.$store.dispatch('fetchWishList')
        })
        .err(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.bottom-right-icon {
  width: 10%;
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
  cursor:pointer;
}
</style>
