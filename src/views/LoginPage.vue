<template>
<div class="hero-body">
  <login></login>
</div>
</template>

<script>
// @ is an alias to /src
import Login from '../components/Login'
export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
