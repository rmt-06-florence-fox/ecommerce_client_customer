<template>
  <section>
    <div class="container-fluid" id="login-form" style="color: #E2B91B">
      <form id="form-login" @submit.prevent="Login">
        <h5>
          Br<i class="fas fa-shoe-prints"></i>.Shoes
        </h5>
        <p>sign in <i class="fas fa-sign-in-alt fa-sm"></i></p>
        <div class="form-group text-start">
          <small class="form-text" style="color: #E2B91B">Email Address</small>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-user-tie"></i></span>
            <input type="email" class="form-control form-control-sm text-center" id="form-log-email" v-model="email">
          </div>
        </div>
        <div class="form-group text-start">
          <small class="form-text" style="color: #E2B91B">Password</small>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-unlock-alt"></i></span>
            <input type="password" class="form-control form-control-sm text-center" id="form-log-password" v-model="password">
          </div>
        </div>
        <div class="form-group mt-2">
          <p id="bt">
            <button type="submit" class="btn btn-outline-primary btn-sm p2" id="btn-signIni"><i class="fa fa-sign-in" aria-hidden="true"></i> sign in</button>
            <button type="reset" class="btn btn-outline-warning btn-sm p2" id="btn-signIni"><i class="fa fa-sign-in" aria-hidden="true"></i> reset</button>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    Login () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('Login', payload)
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
#login-form {
  width: 20%;
  margin-top: 16%;
  margin-bottom: 16%;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding-bottom: 7px;
  padding-top: 20px;
  padding-right: 2%;
  padding-left: 2%;
  background-image: url('https://www.escapeshoes.com/wp-content/uploads/2018/12/httpswww.escapeshoes.commodulesph_simpleblogcovers194.jpg');
}
#btn-signIni {
  width: 48.7%;
}
#bt {
  display: flex;
  justify-content: space-between;
}
</style>
