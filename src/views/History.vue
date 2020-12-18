<template>
  <div class="container">
      <div v-if="isLoading">
        <center>
          <lottie-player src="https://assets4.lottiefiles.com/animated_stickers/lf_tgs_g7ve4rc8.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;" loop  autoplay></lottie-player>
        </center>
      </div>
      <div v-else>
          <!-- <h1>{{ histories }}</h1> -->
          <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th>Price Total Product</th>
                    <th scope="col">Checkout date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="history in histories" :key="history.id">
                        <th scope="row">
                            <img :src="history.Product.image_url" alt="" style="max-width: 9rem; max-height: 16rem">
                        </th>
                        <td>{{ history.Product.name }}</td>
                        <td>{{ history.quantity }}</td>
                        <td>{{ convertMoney(history.quantity * history.Product.price) }}</td>
                        <td>{{ history.updatedAt.split('T')[0] }}</td>
                    </tr>
                </tbody>
            </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    convertMoney (price) {
      let thousand = price.toString().split('').reverse().join('')
      thousand = thousand.match(/\d{1,3}/g)
      thousand = thousand.join('.').split('').reverse().join('')
      return `Rp.${thousand},-`
    }
  },
  created () {
    this.isLoading = true
    this.$store.dispatch('getHistory')
      .then(value => {
        console.log(value.data)
        this.$store.commit('set_histories', value.data.cart)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.isLoading = false
      })
  },
  computed: {
    histories () {
      return this.$store.state.histories
    }
  }
}
</script>

<style>

</style>
