<template>
  
</template>

<script>
export default {
  name: 'Edit',
  data () {
    return {
      stock: '',
      price: '',
      name: '',
      description: '',
      image: ''
    }
  },
  methods: {
    getProduct () {
      const id = this.$route.params.id
      this.$store.dispatch('getProductById', id)
        .then(({ data }) => {
          this.stock = data.stock
          this.price = data.price
          this.name = data.name
          this.description = data.description
          this.image = data.image
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProduct () {
      const payload = {
        id: this.$route.params.id,
        stock: this.stock,
        price: this.price,
        name: this.name,
        description: this.description,
        image : this.image
      }
      this.$store.dispatch('updateProduct', payload)
        .then(({ data }) => {
          this.$router.push({name: 'Home' })
        })    
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getProduct()
  }
}
</script>

<style>

</style>