<template>
  <nav class="navbar navbar-dark bg-dark">
    <div>
      <a class="navbar-brand title nav-title" href="" @click.prevent="goProducts">Pasar Digital</a>
      <a class="navbar-brand" href="" @click.prevent="goCarts" v-if="status">My Cart</a>
      <a class="navbar-brand" href="" @click.prevent="goHistory" v-if="status">History</a>
    </div>
    <div>
      <button class="btn-primary btn btn-logout p-1" @click.prevent="login" v-if="!status">Login</button>
      <button class="btn-danger btn btn-logout p-1 ml-2" @click.prevent="logout" v-if="status">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      status: ''
    }
  },
  methods: {
    reloadStatus () {
      if (localStorage.getItem('access_token')) {
        this.status = true
      } else {
        this.status = false
      }
    },
    login () {
      this.$router.push('/login')
    },
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    goProducts () {
      this.$router.push('/home').catch(() => { this.$store.dispatch('fetchProduct') })
    },
    goCarts () {
      this.$router.push('/cart').catch(() => { this.$store.dispatch('fetchCart') })
    },
    goHistory () {
      this.$router.push('/history').catch(() => { this.$store.dispatch('fetchHistory') })
    }
  },
  created () {
    this.reloadStatus()
  }
}
</script>

<style>

</style>
