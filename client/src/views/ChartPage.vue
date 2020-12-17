<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">Product</th>
                <th scope="col">quantity</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in allCharts" :key="index">
                <th>{{ index + 1 }}</th>
                <td style="width: 200px;">{{ item.name }}</td>
                <td style="width: 200px;">
                    <img :src="item.image_url" :alt="item.name" width="200px">
                </td>
                <td >
                  <button @click="remove(item.id)" type="button" class="btn btn-danger">remove</button>
                  <br>
                  <br>
                  <button @click="minus(item.id)" type="button" class="btn btn-warning">-</button>
                    {{ item.quantity }}
                  <button @click="plus(item.id)" type="button" class="btn btn-primary">+</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'Chart',
  created () {
    this.$store.dispatch('getAllCharts')
  },
  computed: {
    allCharts () {
      return this.$store.state.charts
    }
  },
  methods: {
    plus (id) {
      console.log(id, 'plus')
      this.$store.dispatch('plusChart', id)
    },
    minus (id) {
      console.log(id, 'minus')
      this.$store.dispatch('minusChart', id)
    },
    remove (id) {
      console.log(id)
      this.$store.dispatch('removeChart', id)
    }
  }
}
</script>

<style>

</style>
