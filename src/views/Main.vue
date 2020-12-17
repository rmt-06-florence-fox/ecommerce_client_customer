<template>
<div v-if="!currentUser">
    <div class="home">
    <div class="jumbotron">
      <h1 class="display-4">Welcome to Mr Bee Ecommerce!</h1>
      <p class="lead">You are logged in as customer.</p>
      <hr class="my-4">
      <p>Let's go get your sweet.</p>
    </div>
  </div>
    <router-view />
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Main',
  computed: {
    ...mapState([
      'currentUser'
    ])
  }
}
</script>
