<template>
  <v-app-bar
    app
    dense
    color="blue"
    dark
  >
    <v-toolbar-title>
      <v-img
        alt="Bukatoko Logo"
        class="shrink mr-2"
        contain
        src="../assets/BT-LOGO.png"
        transition="scale-transition"
        width="40"
      />

      <h2
        class="shrink mt-1 hidden-sm-and-down"
      >
        Bukatoko
      </h2>
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

    <router-link to="/">
      <v-btn icon>
        <v-icon>
          mdi-home
        </v-icon>
      </v-btn>
    </router-link>

    <router-link to="/about">
      <v-btn icon>
        <v-icon>
          mdi-information
        </v-icon>
      </v-btn>
    </router-link>

    <router-link to="/cart">
      <v-btn icon>
        <v-icon>
          mdi-cart
        </v-icon>
      </v-btn>
    </router-link>

    <router-link to='/login'>
      <v-btn
        class="ma-2 white--text"
        color="secondary"
      >
        login
        <v-icon
          right
          dark
        >
          mdi-login
        </v-icon>
      </v-btn>
    </router-link>

    <router-link to='/register'>
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
export default {
}
</script>
