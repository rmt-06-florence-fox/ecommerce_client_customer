<template>
  <div>
    <tr v-for="(data, i) in history" :key="i">
    <div class="mb-2 mt-2">
      <td>{{ i+1 }}</td>
      <td><img class="img-cart" :src="data.Product.image_url" alt=""></td>
      <td>{{ data.Product.name }}</td>
      <td id="quantity-container">
        <div>
          <input class="form-group quantity-field mb-1" type="number" min="1" :max="data.Product.stock" v-model="data.quantity" readonly>
        </div>
      </td>
      <td>{{ data.price.toLocaleString('id-ID',
        { style: 'currency', currency: 'IDR' }) }}</td>
    </div>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'TransactionList',
  methods: {
    fetchTransaction () {
      this.$store.dispatch('fetchTransaction')
    }
  },
  computed: {
    history () {
      return this.$store.state.transactionList
    }
  },
  created () {
    this.fetchTransaction()
  }
}
</script>

<style>
  #form-quantity {
    width: 200px;
  }
  #quantity-container {
    height: 100%;
    text-align: center;
    vertical-align: middle;
  }
  .quantity-field {
    width: 100px;
    text-align: center;
  }
  .img-cart {
    width: 200px;
    height: 200px;
  }
  td {
    margin-top: 50px;
    margin-bottom: 50px;
    min-width: 300px;
    max-width: 300px;
    border-bottom: 1px solid #ddd;
  }
  th {
    margin-top: 50px;
    margin-bottom: 50px;
    min-width: 300px;
    max-width: 300px;
    border-bottom: 1px solid #ddd;
  }
  .center {
    margin-left: auto;
    margin-right: auto;
  }
  tr:hover {
    background-color: #f5f5f5;
  }
</style>
