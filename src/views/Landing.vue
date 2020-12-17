<template>
  <div class="landing">
    <div class="uk-section">
      <div class="uk-container">
        <div class="uk-position-center landing-card">
          <!-- Login Section -->
          <div class="uk-card uk-card-login uk-card-body uk-animation-fade rounded" v-show="section==='login'">
            <h1 class="uk-text-lead">Login</h1>
            <form @submit.prevent="login">
              <label class="uk-form-label">Email: </label>
              <div class="uk-form-controls">
                <input v-model="loginPayload.email" type="text" class="uk-input" placeholder="Email" autocomplete="off" />
              </div>
              <label class="uk-form-label">Password: </label>
              <div class="uk-form-controls">
                <input v-model="loginPayload.password" type="password" class="uk-input" placeholder="Password" autocomplete="off" />
              </div>
              <div class="uk-form-controls">
                <button type="submit" class="uk-button uk-button-default">Login</button>
              </div>
            </form>
            <hr>
            Don't have any account ? <a href="#" id="register-now" class="uk-button uk-button-text" @click.prevent="toRegister">Register now</a>
          </div>

          <!-- Register Section -->
          <div class="uk-card uk-card-register uk-card-body uk-animation-fade" v-show="section==='register'">
            <h1 class="uk-text-lead">Register</h1>
            <form @submit.prevent="register">
              <label class="uk-form-label">First Name: </label>
              <div class="uk-form-controls">
                <input v-model="registerPayload.firstName" type="text" class="uk-input" placeholder="First Name" />
              </div>
              <label class="uk-form-label">Last Name: </label>
              <div class="uk-form-controls">
                <input v-model="registerPayload.lastName" type="text" class="uk-input" placeholder="Last Name" />
              </div>
              <label class="uk-form-label">Gender: </label>
              <div class="uk-form-controls">
                <select v-model="registerPayload.gender" class="uk-select" placeholder="Gender">
                  <option value="Any">--Any--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </select>
              </div>
              <label class="uk-form-label">Email: </label>
              <div class="uk-form-controls">
                <input v-model="registerPayload.email" type="text" class="uk-input" placeholder="Email" />
              </div>
              <label class="uk-form-label">Password: </label>
              <div class="uk-form-controls">
                <input v-model="registerPayload.password" type="password" class="uk-input" placeholder="Password" />
              </div>
              <div class="uk-form-controls">
                <div class="buttons">
                  <button type="submit" class="uk-button uk-button-default">Register</button>
                  <button class="uk-button uk-button-danger" @click="toLogin">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Landing',
  data () {
    return {
      loginPayload: {
        email: '',
        password: ''
      },
      registerPayload: {
        firstName: '',
        lastName: '',
        gender: 'Any',
        email: '',
        password: ''
      },
      section: 'login'
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.loginPayload)
        .then(result => {
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('email', result.data.email)
          this.loginPayload = {
            email: '',
            password: ''
          }
          this.$store.commit('login', true)
          this.$store.dispatch('getWishlist')
          this.$store.dispatch('getCart')
          this.$router.push('/')
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Email/Password!'
          })
          console.log(err)
        })
    },
    register () {
      this.$store.dispatch('register', this.registerPayload)
        .then(() => {
          this.section = 'register'
          this.registerPayload = {
            firstName: '',
            lastName: '',
            gender: 'Any',
            email: '',
            password: ''
          }
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'Register successfully'
          })
          this.$router.push('/landing')
        })
        .catch(err => {
          console.log(err)
        })
    },
    toRegister () {
      this.section = 'register'
    },
    toLogin () {
      this.section = 'login'
    }
  }
}
</script>

<style scoped>

.uk-card-register {
  background-image: url(https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=941&q=80);
  background-size: 160%;
  margin-top: 260px;
}

.uk-card-login {
  background-image: url(https://images.unsplash.com/photo-1510674485131-dc88d96369b4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2942&q=80);
  background-size: 160%;
}

form {
  margin-bottom: 50px;
}

#nav {
    font-family: 'Alfa Slab One', cursive;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: greenyellow !important;
}

#register-now {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 1px;
}

.landing-card {
  width: 30rem;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}

.uk-button {
  font-family: 'Alfa Slab One', cursive;
}

.uk-button-default {
  background-color: black;
  color: white;
}

.uk-button-default:hover {
  transition: 300ms;
  background-color: #20bf6b;
  color: black;
}

.uk-card {
  height: auto;
  z-index: 3;
}

.uk-form-controls {
  margin-bottom: 2em;
}

.uk-input {
  width: 70%;
}

.uk-select {
  width: 70%;
}

.uk-text-lead {
  font-family: 'Alfa Slab One', cursive;
  font-size: 4em;
}
</style>
