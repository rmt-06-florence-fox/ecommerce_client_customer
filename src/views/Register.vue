<template>
  <div class="login d-flex text-left">
    <RegisterForm />
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterForm from "../components/RegisterForm";

export default {
  name: "Register",
  components: {
    RegisterForm
  }
};
</script>
