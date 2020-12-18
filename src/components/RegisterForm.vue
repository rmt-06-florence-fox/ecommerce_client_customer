<template>
  <!-- Material form Register -->
  <div class="container col-sm-3 text-center">
    <img class="mb-3 text-center custom-logo" src="../assets/logo.png" />
    <hr />
    <form @submit.prevent="register">
      <p class="h4 text-center mb-4">Register</p>
      <div class="grey-text text-left">
        <mdb-input
          label="Your name"
          icon="user-alt"
          type="text"
          v-model="form.name"
          required
        /><mdb-input
          label="Your email"
          icon="envelope"
          type="email"
          v-model="form.email"
          required
        />
        <mdb-input
          label="Your password"
          icon="lock"
          type="password"
          v-model="form.password"
          required
        />
      </div>
      <div class="text-center">
        <mdb-btn type="submit">Submit</mdb-btn>
      </div>
    </form>
    <!-- Material form Register -->
  </div>
</template>

<script>
import { mdbInput, mdbBtn } from "mdbvue";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },

      show: true,
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.form);
    },
    cancel() {
      // Reset our form values
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  components: {
    mdbInput,
    mdbBtn,
  },
};
</script>

<style>
.custom-logo {
  height: 100px;
  width: 100px;
}
</style>
