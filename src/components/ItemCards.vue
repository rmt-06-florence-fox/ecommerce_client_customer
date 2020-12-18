<template>
  <div class="container">
      <main class="grid">
          <article
            v-for="data in dataItems.data"
            :key="data.id">
              <button class="delButton" @click="deleteData(data.id)" style="width:38px"><b>X</b></button>
              <img :src="data.Product.image_url">
              <div class="text">
                  <h3>{{data.Product.name}}</h3>
                  <p>Rp {{data.Product.price}}</p>
                  <div class="row">
                      <p> <b>Stock:</b> {{data.Product.stock}} || <b>Order:</b> {{data.quantity}}</p>
                  </div>
                  <div class="text-center">
                    <button style="width:40px" @click="minQuantity(data.id)">Min</button> ||
                    <button style="width:40px" @click="addQuantity(data.id)">Add</button>
                  </div>
              </div>
          </article>
      </main>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'ItemCards',
  methods: {
    fetchDataCart () {
      this.$store.dispatch('fetchDataCart')
    },

    minQuantity (id) {
      this.$store.dispatch('decrementDataCart', id)
        .then(_ => {
          this.fetchDataCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQuantity (id) {
      this.$store.dispatch('incrementDataCart', id)
        .then(_ => {
          this.fetchDataCart()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteData (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('deleteDataCart', id)
          } else {
            return true
          }
        })
        .then(_ => {
          this.fetchDataCart()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.fetchDataCart()
  },
  computed: {
    dataItems () {
      return this.$store.state.dataCart
    }
  }
}
</script>

<style>
body {
    background: white;
}

.grid {
    margin-top: 4%;
    margin-left: 10%;
    margin-right: 0%;
    margin-bottom: 1%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1px;
    align-items: center;
}

.grid article {
    background: white;
    border: none;
    box-shadow: 2px 2px 6px 0px black;
    border-radius: 20px;
    text-align: center;
    width: 280px;
    height: 370px;
    transition: transform .3s;
}

.grid article:hover {
    transform: translateY(5px);
    box-shadow: 2px 2px 6px 0px black;
}

.grid article img {
    width: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    height: 172px;
}
.delButton {
  margin-top: 10px;
  margin-left: 220px;
  height: 27px;
}
.text {
    padding: 0px 20px 20px;
    font-size: 12px;
}

.text p {
    margin-bottom: 10px;
}

.text h3 {
    text-transform: uppercase;
    margin-bottom: 2px;
    margin-top: 4px;
}

.text button {
    background: red;
    border-radius: 20px;
    border: none;
    color: white;
    padding: 10px;
    width: 100%;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px) {
    .grid {
        grid-template-columns: repeat(1, 1fr);
    }
    .grid articale {
        text-align: center;
    }
}
</style>
