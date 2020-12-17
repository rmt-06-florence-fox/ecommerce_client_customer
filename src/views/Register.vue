<template>
  <div id="register" class="container-fluid">
    <div class="register">
        <img src="../assets/gambar2.jpg" class="front-img">
    </div>
    <div class="register-form">
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="email-register">Email address</label>
                <input v-model="email" type="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="password-register">Password</label>
                <input v-model="password" type="password" class="form-control">
            </div>
            <button type="submit" class="btn btn-info">Register</button>
        </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #register {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 5%;
  }
  .register-form {
    border-radius: 15px;
    background-color: whitesmoke;
    padding: 60px
  }
</style>
