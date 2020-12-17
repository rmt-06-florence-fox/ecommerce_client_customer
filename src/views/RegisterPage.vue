<template>
<div class="hero-body">
  <register></register>
</div>
</template>

<script>
// @ is an alias to /src
import Register from '../components/Register.vue'

export default {
  name: 'Home',
  components: {
    Register
  }
}
</script>
