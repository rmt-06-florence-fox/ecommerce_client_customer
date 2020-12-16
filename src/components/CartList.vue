<template>
  <div>
    <tr v-for="(cart, i) in carts" :key="i">
    <div class="mb-2 mt-2">
      <td>{{ i+1 }}</td>
      <td><img class="img-cart" :src="cart.Product.image_url" alt=""></td>
      <td>{{ cart.Product.name }}</td>
      <td id="quantity-container">
        <div v-if="showEdit === true">
          <form @submit.prevent="putCart(cart.Product.id, quantity), edit(false)">
          <div class="row form-quantity">
            <div class="col-12">
              <button class="btn btn-danger btn-sm col-1 mr-2" @click="decrease(cart.Product.id), edit(false)">-</button>
              <input class="form-group quantity-field mb-1" type="number" min="0" :max="cart.Product.stock" v-model="quantity" :placeholder="cart.quantity">
              <button class="btn btn-primary btn-sm col-1 ml-2" @click="increase(cart.Product.id), edit(false)">+</button>
            </div>
            <div class="col mt-3">
              <button type="submit" class="btn btn-sm btn-primary col-2 mr-1">Save</button>
              <button class="btn btn-sm btn-danger col-3 ml-1" @click="edit(false)">Cancel</button>
            </div>
          </div>
          </form>
        </div>
        <div v-else>
          <button class="btn btn-danger btn-sm col-1 mr-2" @click="decrease(cart.Product.id)">-</button>
          <input class="form-group quantity-field mb-1" type="number" min="1" :max="cart.Product.stock" v-model="cart.quantity" readonly>
          <button class="btn btn-primary btn-sm col-1 ml-2" @click="increase(cart.Product.id)">+</button>
          <div>
            <button class="btn btn-sm btn-primary" @click="edit(true)">Edit</button>
          </div>
        </div>
      </td>
      <td>Rp. {{ cart.price }},00</td>
      <td>
        <button class="btn btn-primary mr-2" @click="buyCart(cart.id)">Buy</button>
        <button class="btn btn-danger ml-2" @click="deleteCart(cart.id)">Remove</button>
      </td>
    </div>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'CartList',
  data () {
    return {
      quantity: null,
      totalPrice: 0,
      showEdit: ''
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    },
    increase (id) {
      this.$store.dispatch('increase', id)
    },
    decrease (id) {
      this.$store.dispatch('decrease', id)
    },
    putCart (id, quantity) {
      const payload = {
        id,
        quantity
      }
      this.$store.dispatch('putCart', payload)
      this.quantity = null
    },
    edit (status) {
      console.log(status)
      this.showEdit = status
    },
    buyCart (id) {
      this.$store.dispatch('patchCart', id)
    },
    getTotal () {
      this.carts.forEach(e => {
        this.totalPrice = this.totalPrice + e.price
      })
      this.$store.commit('totalPrice', this.totalPrice)
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    }
  },
  created () {
    this.fetchCart()
    this.getTotal()
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
