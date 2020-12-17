<template>
  <div class="container">
    <div class="card bg-light" id="login-card">
      <div class="card-body">
        <h2 class="text-center">Register</h2><br>
        <form @submit.prevent="register">
          <div class="form-group">
            <input v-model="user.email" type="email" class="form-control" name="" id="email" placeholder="Enter email">
          </div>

          <div class="form-group">
            <input v-model="user.password" type="password" class="form-control" name="" id="email" placeholder="Enter password">
          </div>

          <small>Already Have an Account?</small> <router-link to="/login"><small>Login here</small></router-link>
          <button type="submit" id="button" class="btn btn-primary deep-purple btn-block">Register</button><br>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', this.user)
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 20px;
  }
  #login-card {
      width:350px;
      border-radius: 25px;
      margin:150px auto;
      background: white;
  }
  #email {
      border-radius:30px;
      background-color: #ebf0fc;
      border-color: #ebf0fc;
      color: #9da3b0;
  }
  #button {
      border-radius:30px;
  }
  #btn {
    position: absolute;
    bottom: -35px;
    padding: 5px;
    margin: 0px 55px;
    align-items: center;
    border-radius: 5px;
  }
  #container {
      margin-top:25px;
  }
  .btn-circle.btn-sm {
    width: 40px;
    height: 40px;
    padding: 2px 0px;
    border-radius: 25px;
    font-size: 14px;
    text-align: center;
    margin: 8px;
  }
</style>
