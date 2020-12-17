<template>
  <div class="transaction-page">
    <h3>TRANSACTION HISTORY</h3>
    <div class="container-card-list shadow mt-5">
      <div class="container-detail-card" v-for="(transaction, i) in getTransactionHistory" :key="i">
          <div class="left-detail">
            <img class="card-img-top" :src="transaction.Product.image_url"  alt="Card image cap">
          </div>
          <div class="right-detail">
            <h2>{{transaction.Product.name}}</h2>
            <p class="card-text m-2" >Quantity: {{transaction.quantity}}</p>
            <p>{{formatRupiah(transaction.Product.price * transaction.quantity)}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionHistory',
  methods: {
    formatRupiah (number) {
      const numberString = number.toString()
      const jumlahSisa = numberString.length % 3
      const angkaAwalString = numberString.substr(0, jumlahSisa)
      const ribuan = numberString.substr(jumlahSisa).match(/\d{3}/g)

      if (ribuan) {
        const separator = jumlahSisa ? '.' : '' // kalau ada sisa, tambahkan separator
        return 'Rp. ' + angkaAwalString + separator + ribuan.join('.')
      } else {
        return `Rp. ${angkaAwalString}`
      }
    }
  },
  computed: {
    getTransactionHistory () {
      return this.$store.state.transactionHistory
    },
    getLoginStatus () {
      return this.$store.state.loginStatus
    }
  },
  created () {
    this.$store.commit('setLoginStatusOn')
    this.$store.dispatch('fetchTransactionHistory')
  }
}
</script>

<style>
.container-card-list {
  width: 45%;
  margin: auto  ;
}
.container-detail-card {
  display: flex;
  align-items: top;
}
.left-detail {
  width: 20vw;
  height: 17vw;
}
.right-detail {
  justify-content: center;
  text-align: left;
  font-size: 1rem;
}
</style>
