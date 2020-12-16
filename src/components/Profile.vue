<template>
  <div class="profile">
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    email () {
      if (this.$store.state.logged) {
        return localStorage.getItem('email')
      }
      return ''
    }
  }
}
</script>

<style>
.profile p {
  font-family: 'Alfa Slab One', cursive;
  font-size: 15px;
  margin-left: 5px;
}

.profile {
  position: absolute;
}
</style>
