<template>
  <b-card
    img-src="https://placekitten.com/380/200"
    img-left
    style="width:90%"
  >
   <template #header>
      <h5 class="mb-0">Product Name here</h5>
    </template>

    <b-card-body>
      <b-card-title class="mb-3">Price here</b-card-title>
      <b-card-text> Stock available : 200 </b-card-text>
      <div class="d-flex">
        <b-button @click="number--">-</b-button>
        <b-form style="width:50%">
          <b-form-input
            type="number"
            v-model="number"
          ></b-form-input>
        </b-form>
        <b-button @click="number++">+</b-button>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'CartCard',
  data () {
    return {
      number: 0
    }
  }
}
</script>

<style>

</style>
