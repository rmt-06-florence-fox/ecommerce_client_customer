<template>
  <div>
      {{ data }}
      <main class="grid">
          <article
            v-for="data in dataItems.data"
            :key="data.id">
              <img :src="data.image_url">
              <div class="text">
                  <p>{{data.Categorie.name}}</p>
                  <h3>{{data.name}}</h3>
                  <p>Rp {{data.price}}</p>
                  <p>Stock: {{data.stock}}</p>
                  <button @click="formLogin">Add tocart <i class="fa fa-cart-plus"></i></button>
              </div>
          </article>
      </main>
  </div>
</template>

<script>
export default {
  name: 'ItemCardsHome',
  props: ['data'],
  methods: {
    formLogin () {
      this.$router.push('/login')
    },
    fetchData () {
      this.$store.dispatch('fetchData')
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
body {
    background: white;
}

.grid {
    margin-top: 4%;
    margin-left: 20%;
    margin-right: 20%;
    margin-bottom: 1%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
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
