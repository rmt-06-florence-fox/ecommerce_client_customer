<template>
  <div class="d-flex flex-column justify-content-center h-100" id="form-container">
    <div class="w-50 mx-auto  text-white">
     <div class="mb-3 text-center">
        <h3>Hello, please submit form below to register</h3>
     </div>
      <b-form class="d-flex flex-column justify-content-center">
        <b-form-group
          label="Full Name"
          label-for="fullName"
        >
          <b-form-input
            id="fullName"
            placeholder="Enter full name here"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="User Name"
          label-for="userName"
        >
          <b-form-input
            id="userName"
            placeholder="Enter user name here"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Email"
          type="email"
          label-for="email"
        >
          <b-form-input
            id="email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Your Password:"
          label-for="password">
          <b-form-input
            id="password"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Login</b-button>
      </b-form>
      <div class="mb-3 text-center text-dark">
        <h3>Have an account ?</h3>
        <h4>Login <router-link to="/login" class="text-success">here</router-link> instead</h4>
     </div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style>
#form-container {
  background: linear-gradient(to top, #f4f4f4, #222831);
}
</style>
