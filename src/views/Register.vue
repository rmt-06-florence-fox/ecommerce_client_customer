<template>
  <section><br>
    <div class="container-fluid" id="regis-form" style="color: #E2B91B;">
      <form id="form-login" @submit.prevent="Register()">
        <h3>
          Br<i class="fas fa-shoe-prints"></i>.Shoes
        </h3>
        <h4>sign up <i class="fas fa-sign-in-alt fa-sm"></i></h4>
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
            <button type="submit" class="btn btn-outline-primary p2" id="btn-signInii"><i class="fa fa-sign-in" aria-hidden="true"></i> sign up</button>
            <button type="reset" class="btn btn-outline-warning p2" id="btn-signInii" @click="gohome()"><i class="fa fa-sign-in" aria-hidden="true"></i> back</button>
          </p>
        </div>
      </form>
    </div>
    <Footer />
  </section>
</template>

<script>
import Footer from '../components/Footer'
export default {
  name: 'Register',
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
    gohome () {
      this.$router.push({ name: 'Home' })
    },
    Register () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('Register', payload)
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
#regis-form {
  width: 28%;
  height: 320px;
  margin-top: 248px;
  margin-bottom: 17.5%;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding-bottom: 7px;
  padding-top: 20px;
  padding-right: 2%;
  padding-left: 2%;
  background-image: url('https://blog.safetyshoes.co.id/wp-content/uploads/2016/06/d1.jpg');
}
#btn-signInii {
  width: 48.7%;
}
#bt {
  display: flex;
  justify-content: space-between;
}
</style>
