<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-sm-12 mt-5">
          <div class="card">
            <div class="card-headers">
              Carts
            </div>
            <div class="card-body">
              <!-- Looping Product Card -->
              <Cart></Cart>
              <Cart></Cart>
              <Cart></Cart>
            </div>
          </div>
        </div>
        <div class="col-md-5 col-sm-12 mt-5">
          <div class="card">
            <div class="card-headers">
                Checkout
            </div>
            <div class="card-body">
              <table class="table">
                <tr>
                  <th>Total Transactions</th>
                  <td>Rp 1.000.000,00</td>
                </tr>
              </table>
            </div>
            <div class="card-footer">
              <button class="btn btn-checkout">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
export default {
  name: 'Carts',
  components: {
    Navbar,
    Cart
  }
}
</script>

<style>
.img-cart{
  width: 100px;
}
.btn-checkout{
  background-color: #2fd4f5 !important;
  width: 130px;
}
</style>
