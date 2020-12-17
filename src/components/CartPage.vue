<template>
  <div class="cart-page">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a @click="dashboard" class="navbar-brand" href="#">Customer Tokped</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <p></p>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <router-link to="/carts">
            <button class="btn btn-info btn-lg" style="margin-right: 10px;">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-cart-check-fill" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM4 14a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm7 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm.354-7.646a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              </svg>
              Your Cart
            </button>
          </router-link>
          <router-link to="/login">
            <button @click="logout" class="btn btn-info btn-lg">
              <span class="glyphicon glyphicon-log-out"></span> Log out
            </button>
          </router-link>
        </form>
      </div>
    </nav>

    <div v-if="!carts">
      <h1>Tidak Ada Keranjang</h1>
      <router-link to="/">
        Kembali ke Dashboard untuk belanja
      </router-link>
    </div>
    <div v-else-if="carts.CartLists.length == 0">
      <h1>Tidak Ada Barang Belanja di Keranjang</h1>
      <router-link to="/">
        Kembali ke Dashboard untuk belanja
      </router-link>
    </div>
    <div v-else class="container">
      <div class="category-container">
        <div class="task-container overflow-auto">
          <div class="card" v-for="(cart, id) in carts.CartLists" :key="id">
            <div class="card-header">
              {{cart.Product.name}}
            </div>
            <div class="card-body">
              <a style="align-text: center;" target="_blank" :href="cart.Product.image_url">
                <img :src="cart.Product.image_url" class="card-img-top product-picture" alt="">
              </a>
              <div class="d-flex justify-content-between">
                <h5 class="card-title">Price</h5>
                <div class="dropdown">
                  <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                    </svg>
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" @click="removeFromCart(cart.ProductId)" href="#">Remove From Cart</a>
                  </div>
                </div>

              </div>

              <h5 class="card-text">{{cart.quantity}} x {{cart.Product.price}}</h5>
              <h5 class="card-text">Total: {{cart.price}}</h5>
              <div class="d-flex justify-content-between pt-3">
                <a href="#" @click="removeQuantity(cart.ProductId, cart.quantity)">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dash-square" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </a>
                <p>{{ cart.quantity}}</p>
                <a href="#" @click="addQuantity(cart.ProductId, cart.quantity)">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path fill-rule="evenodd"
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill">{{carts.CartLists.length}}</span>
        </h4>
        <ul class="list-group mb-3" >
          <li class="list-group-item d-flex justify-content-between lh-condensed" v-for="(cart, id) in carts.CartLists" :key="id">
            <div>
              <h6 class="my-0">{{cart.Product.name}}</h6>
            </div>
            <span class="text-muted">Rp. {{cart.price}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (IDR)</span>
            <strong>Rp. {{carts.totalPrice}}</strong>
          </li>
        </ul>

        <form class="card p-2">
          <button @click.prevent="checkout" class="btn btn-primary btn-lg btn-block" type="submit">Checkout</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'CartPage',
    methods: {
      fetchCarts() {
        this.$store.dispatch('fetchAllCarts')
      },
      addQuantity(id, quantity) {
        const payload = {
          ProductId: id,
          quantity: quantity + 1
        }
        this.$store.dispatch('addToCart', payload)
      },
      removeQuantity(id, quantity) {
        const payload = {
          ProductId: id,
          quantity: quantity - 1
        }
        const cartId = {
          CartId: this.carts.id,
          ProductId: id
        }
        if (payload.quantity <= 0) {
          this.$store.dispatch('deleteCart', cartId)
            .then(() => {
              this.fetchCarts()
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$store.dispatch('addToCart', payload)
        }
      },
      removeFromCart(id) {
        const payload = {
          ProductId: id,
          CartId: this.carts.id,
        }
        this.$store.dispatch('removeFromCart', payload)
      },
      checkout() {
        let payload = {
          id: this.carts.id
        }
        this.$store.dispatch('checkout', payload)
      },
      logout() {
        this.$store.dispatch('logout')
      },
      dashboard() {
        this.$router.push({ name: 'Home' })
      }
    },
    created() {
      this.fetchCarts()
    },
    computed: {
      carts() {
        return this.$store.state.carts
      }
    }
  }
</script>

<style scoped>
  .quantityButton a {
    font-size: 100px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 73vh;
    padding: 10px;
    margin-top: 10px;
    margin-left: 55px;
    margin-right: 55px;
  }
  .category-container {
    display: flex;
    flex-direction: column;
    background-color: #f1f2f6;
    margin: 15px;
    border-radius: 0.35em;
    border: 0.1px solid #b2bec3;
    width: 500px;
  }
  .card-header {
    font-size: 25px;
    font-weight: 400;
  }
  .card-header a {
    align-items: flex-end;
    float: right;
  }
  .task-container {
    /* display: flex; */
    flex-direction: column;
    margin: 0px;
    height: 60vh;
  }
  .card {
    display: flex;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .card-title {
    font-weight: 400;
    font-size: 22px;
  }
  .card-body a {
    font-size: 1rem;
  }
  .card-text {
    font-weight: 300;
    font-size: 18px;
    text-align: left;
  }
  .card-body h6 {
    display: flex;
    font-style: italic;
    font-size: 15px;
    padding-top: 6px;
    color: #b2bec3;
  }
  img {
    display: flex;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 100%;
    height: auto;
  }
  img:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
  .product-picture {
    width: 120px;
    min-height: 120px;
    max-height: auto;
    float: left;
    margin: 3px;
    padding: 3px;
  }
</style>