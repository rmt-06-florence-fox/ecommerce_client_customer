<template>
  <section><br>
    <div class="container-fluid" id="login-form" style="color: #E2B91B;">
      <form id="form-login" @submit.prevent="Login()">
        <h3>
          Br<i class="fas fa-shoe-prints"></i>.Shoes
        </h3>
        <h4>sign in <i class="fas fa-sign-in-alt fa-sm"></i></h4>
        <div class="form-group text-start">
          <small class="form-text" style="color: #E2B91B">Email Address</small>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-user-tie"></i></span>
            <input type="email" class="form-control form-control text-center" id="form-log-email" v-model="email">
          </div>
        </div>
        <div class="form-group text-start">
          <small class="form-text" style="color: #E2B91B">Password</small>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1"><i class="fas fa-unlock-alt"></i></span>
            <input type="password" class="form-control form-control text-center" id="form-log-password" v-model="password">
          </div>
        </div>
        <div class="form-group">
          <p id="bt">
            <button type="submit" class="btn btn-outline-primary p2" id="btn-signIni"><i class="fa fa-sign-in" aria-hidden="true"></i> sign in</button>
            <button type="reset" class="btn btn-outline-warning p2" id="btn-signIni" @click="gohome()"><i class="fa fa-sign-in" aria-hidden="true"></i> back</button>
          </p>
          <small class="form-text" style="color: #E2B91B">don't have an account yet <span style="color: white"><a type="button" @click="register()">Sign Up</a></span></small>
        </div>
      </form>
    </div>
    <Footer />
  </section>
</template>

<script>
import Footer from '../components/Footer'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Footer
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
    },
    gohome () {
      this.$router.push({ name: 'Home' })
    },
    register () {
      this.$router.push({ name: 'Register' })
    }
  }
}
</script>

<style>
#login-form {
  width: 28%;
  height: 340px;
  margin-top: 248px;
  margin-bottom: 16.80%;
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
