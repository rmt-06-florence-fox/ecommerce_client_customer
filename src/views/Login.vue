<template>
 <div class="d-flex flex-column justify-content-center h-100" id="form-container">
    <div class="w-50 mx-auto  text-white">
     <div class="mb-3 text-center">
        <h3>Welcome to heroes station</h3>
        <h4>A place where we are able to get our heroes</h4>
     </div>
      <b-form class="d-flex flex-column justify-content-center">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Login</b-button>
      </b-form>
      <div class="mb-3 text-center text-dark">
        <h3>Do not have an account ?</h3>
        <h4>Register <router-link to="/register" class="text-success">here</router-link></h4>
     </div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style>
#form-container {
  background: linear-gradient(to top, #f4f4f4, #222831);
}
</style>
