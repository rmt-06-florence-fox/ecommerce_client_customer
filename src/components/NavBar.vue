<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand>Pasar Terang</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="status === 'loggedIn'">
          <b-icon icon="minecart-loaded"></b-icon>
        </b-nav-item>
        <b-nav-item v-if="status === 'loggedIn'">
          <b-icon icon="box-arrow-in-right"></b-icon> logout
        </b-nav-item>
        <b-nav-item v-if="status === 'loggedOut'" @click.prevent="showLoginModal">
          <b-icon icon="box-arrow-in-left" ></b-icon> login
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <LoginModal :show="true"></LoginModal>
  </div>
</template>

<script>
import LoginModal from '../components/LoginModal'
export default {
  components: {
    LoginModal
  },
  name: 'NavBar',
  computed: {
    status () {
      return this.$store.state.status
    }
  },
  methods: {
    showLoginModal () {
      console.log('ke klik')
      this.$bvModal.show('modal-login')
    }
  }
}
</script>

<style>

</style>
