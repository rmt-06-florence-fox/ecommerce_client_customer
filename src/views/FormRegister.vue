<template>
  <div>
        <Header></Header>
        <NavbarLogin></NavbarLogin>
        <div class="mx-auto mt-1">
            <div class="shadow p-3 mb-5 bgS rounded mx-auto mt-4 color-page">
                <div class="text-center">
                    <h2>Register</h2>
                </div>
                <form @submit.prevent="submitRegister">
                    <div class="form-group row">
                        <div class="mx-auto mt-2">
                            <label for="emailLogIn" class="col-sm-2 col-form-label">Email:</label> <br>
                        </div>
                        <div class="col-sm-10 mx-auto">
                            <input v-model="email" type="email" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="mx-auto mt-2">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Password:</label>
                        </div>
                        <div class="col-sm-10 mx-auto">
                            <input v-model="password" type="password" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="mx-auto mt-3">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import NavbarLogin from '../components/NavbarLogin'
import Footer from '../components/Footer'
export default {
  name: 'FormRegister',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Header,
    NavbarLogin,
    Footer
  },
  methods: {
    submitRegister () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('registerCustomer', payload)
        .then(data => {
          this.$router.push('/login')
        })
        .catach(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
