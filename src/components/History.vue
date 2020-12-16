<template>
  <div id="history">
    <table class="uk-table uk-table-divider uk-table-middle">
      <thead>
        <tr>
            <th class="uk-table-expand table-head">Product Image</th>
            <th class="uk-table-expand table-head">Product Name</th>
            <th class="uk-table-expand table-head">Product Price</th>
            <th class="uk-table-expand table-head">Amount</th>
            <th class="uk-table-expand table-head">Paid date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in history" :key="item.id">
            <td><img id="product-image" :src="item.Product.image_url" alt="" width="300px" height="200px" uk-img></td>
            <td>{{ item.Product.name }}</td>
            <td>{{ toRupiahs(item.Product.price) }}</td>
            <td>
              <span id="item-amount">{{ item.amount }}</span>
            </td>
            <td>{{ new Date(item.updatedAt).toString().split(' ').slice(0, 5).join(' ') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'History',
  methods: {
    toRupiahs (rp) {
      let rupiah = ''
      const angkarev = rp.toString().split('').reverse().join('')
      for (var i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',-'
    }
  },
  computed: {
    history () {
      return this.$store.state.history
    }
  },
  created () {
    this.$store.dispatch('getHistory')
  }
}
</script>

<style>
#history {
  margin-left: 220px;
  width: 100%;
}

#item-amount {
  margin: 0 10px;
}

.action {
  text-decoration: none;
  color: black;
}

.action:hover {
  color: #ff9966;
  transition: 300ms;
}

.table-head {
  text-align: center !important;
}
</style>
