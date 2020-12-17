<template>
  <v-app-bar
    app
    dense
    color="blue"
    dark
  >
    <v-toolbar-title>
      <!-- <v-img
        alt="Bukatoko Logo"
        class="shrink mr-2"
        contain
        src="../assets/BT-LOGO.png"
        transition="scale-transition"
        width="40"
      /> -->
      <router-link to="/">
        <h2
          class="shrink mt-1"
        >
          Bukatoko
        </h2>
      </router-link>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down pl-10 ml-4"
    />

    <v-spacer></v-spacer>

    <router-link to="/about">
      <v-btn icon>
        <v-icon>
          mdi-information
        </v-icon>
      </v-btn>
    </router-link>

    <router-link to="/cart">
      <v-btn icon>
        <v-badge
          :content="carts.length"
          :value="carts.length"
          color="warning"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </router-link>

    <router-link to="/history">
      <v-btn icon>
        <v-icon>
          mdi-history
        </v-icon>
      </v-btn>
    </router-link>

    <router-link to='/login'
      v-if="!isLogin"
    >
      <v-btn
        class="ma-2 white--text"
        color="secondary"
      >
        Login
        <v-icon
          right
          dark
        >
          mdi-login
        </v-icon>
      </v-btn>
    </router-link>

      <v-btn
        class="ma-2 white--text"
        color="secondary"
        v-if="isLogin"
        @click="logout"
      >
        Logout
        <v-icon
          right
          dark
        >
          mdi-logout
        </v-icon>
      </v-btn>

    <router-link to='/register'
      v-if="!isLogin"
    >
      <v-btn
        class="ma-2 white--text"
        color="secondary"
      >
        Sign Up
        <v-icon
          right
          dark
        >
          mdi-account-plus
        </v-icon>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: mapState(['carts', 'isLogin'])
}
</script>

<style>
  a {  text-decoration: none;}
</style>
