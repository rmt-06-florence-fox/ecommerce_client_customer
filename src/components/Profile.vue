<template>
<div>
  <p><span uk-icon="user"></span>: {{ email }}</p><hr>
  <div class="profile">
  </div>
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
