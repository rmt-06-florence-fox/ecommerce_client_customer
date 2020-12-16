<template>
  <div style="margin-top:90px">
      <div v-if="history.length === 0">
        <h1 style="margin-top:230px">Your history is empty</h1>
        <img src="https://img.freepik.com/free-vector/happy-tiny-people-listening-spiritual-music_74855-5870.jpg?size=626&ext=jpg" alt="">
      </div>
      <div v-else>
        <div class="container">
          <h1>Transactions History</h1>
          <button class="btn btn-danger" @click="clearHistory">Clear history</button>
          <div class="mt-5">
            <div>
              <div v-for="item in history" :key="item.id">
                <b-card no-body class="overflow-hidden mt-3 card-text-center" style="max-width: 540px; height: 150px; ">
                  <b-row no-gutters>
                    <b-col md="6" >
                      <b-card-img :src="item.imageUrl" alt="Image" class="rounded-0" style="height: 150px"></b-card-img>
                    </b-col>
                    <b-col md="6">
                      <b-card-body>
                        <h4 class="text-left mb-2"><strong>{{ item.name }}</strong></h4>
                        <h6 class="text-left mb-2"><strong>Rp {{ item.price.toLocaleString('id') }} x {{ item.quantity }} items</strong></h6>
                        <h6 class="text-left"><strong>Total : Rp {{ (item.price * item.quantity).toLocaleString('id') }}</strong></h6>
                        <p>{{ item.createdAt.split('T')[0] }}</p>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  methods: {
    fetchHistory () {
      this.$store.dispatch('fetchHistory')
    },
    clearHistory () {
      console.log('masuk')
      this.$store.dispatch('clearHistory')
        .then(_ => {
          this.fetchHistory()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchHistory()
  },
  computed: {
    history () {
      return this.$store.state.history.data
    }
  }
}
</script>

<style>

</style>
