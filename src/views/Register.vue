<template>
  <div class="loginBox" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); background-color: white;">
    <div class="row justify-content-center my-auto">
        <div class="row col-12 justify-content-center px-3 mb-3">
            <img id="logos" src="../assets/logo.png">
        </div>
        <div class="col-md-8 col-10 mt-1">
            <form @submit.prevent="register">
              <div class="form-group">
                    <label class="form-control-label text-muted">Nama Lengkap</label>
                    <input v-model="name" type="text" id="email" name="email" placeholder="ex: Ucup Pamungkas" class="form-control"> </div>
                <div class="form-group">
                    <label class="form-control-label text-muted">Email</label>
                    <input v-model="email" type="text" id="email" name="email" placeholder="email mana email" class="form-control"> </div>
                <div class="form-group">
                    <label class="form-control-label text-muted">Password</label>
                    <input v-model="password" type="password" id="psw" name="psw" placeholder="123456" class="form-control"> </div>
                <div class="form-group">
                    <label class="form-control-label text-muted">Mendaftar sebagai:</label> <br>
                    <!-- radio siswa -->
                    <input v-model="role" class="col-1" type="radio" id="student" name="gender" value="student">
                    <label class="mr-3" for="student">Siswa</label>
                    <!-- radio guru -->
                    <input v-model="role" class="col-1" type="radio" id="teacher" name="gender" value="teacher">
                    <label for="teacher">Guru</label></div>
                  <!-- v-if -->
                  <div v-if="role=='teacher'" class="form-group">
                    <label class="form-control-label text-muted">Mau ngajar apa nich?</label>
                    <input v-model="subject" type="text" id="subject" name="subject" placeholder="ex: Ilmu Buzzer" class="form-control"> </div>
                  <div v-if="role=='teacher'" class="form-group">
                    <label class="form-control-label text-muted">Motivasi</label>
                    <input v-model="motive" type="text" id="motive" name="motive" placeholder="ingin hidup bermanfaat *cielah" class="form-control"> </div>
                    <!-- tombol -->
                <div class="row justify-content-center my-3 px-3">
                    <button class="btn-block btn-color">Join us!</button>
                </div>
                    <router-link to="/login"><p class="buah row justify-content-center" style="font-size: 12px">cancel</p></router-link>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      email: '',
      password: '',
      name: '',
      role: '',
      subject: '',
      motive: ''
    }
  },
  methods: {
    register () {
      const obj = {
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.role,
        subject: this.subject,
        motive: this.motive
      }
      this.$store.dispatch('register', obj)
        .then(response => {
          // console.log(response.data.access_token)
          localStorage.setItem('access_token', response.data.access_token)
          Swal.fire({
            title: 'Awas nyesel!',
            icon: 'success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          const message = err.response.data
          console.log(message)
          Swal.fire({
            title: message,
            icon: 'error'
          })
        })
    }
  }
}
</script>

<style>
#logos {
  /* position: absolute; */
  /* top: 1px; */
  /* left: 60px; */
  padding-top: 30px;
  max-width: 120px;
  height: auto;
  /* margin-bottom: 50px; */
}

.loginBox {
    min-width: 50px !important;
    /* margin-bottom: -100px; */
}

.buah:hover {
    cursor: pointer;
    color: red
}

#particles-js {
    height: 100%
}

.loginBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: auto;
    background: #ffffff;
    border-radius: 10px;
    padding-top: 50px;
    box-sizing: border-box
}

.user {
    margin: 0 auto;
    display: block;
    margin-bottom: 20px
}

h3 {
    margin: 0;
    padding: 0 0 20px;
    color: #59238F;
    text-align: center
}

.loginBox input {
    width: 100%;
    margin-bottom: 20px
}

.loginBox input[type="text"],
.loginBox input[type="password"] {
    border: none;
    border-bottom: 2px solid #262626;
    outline: none;
    height: 40px;
    color: #fff;
    background: transparent;
    font-size: 16px;
    padding-left: 20px;
    box-sizing: border-box
}

input:focus,
textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #007991 !important;
    outline-width: 0;
    font-weight: 400
}

.inputBox {
    position: relative
}

.inputBox span {
    position: absolute;
    top: 10px;
    color: #262626
}

.loginBox input[type="submit"] {
    border: none;
    outline: none;
    height: 40px;
    font-size: 16px;
    background: #59238F;
    color: #fff;
    border-radius: 20px;
    cursor: pointer
}

.loginBox a {
    color: #262626;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    display: block
}

/* a:hover {
    color: #00ffff
} */

p {
    color: #0000ff
}
</style>
