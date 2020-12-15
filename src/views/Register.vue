<template>
  <div class="loginBox" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">
    <div class="row justify-content-center my-auto">
        <div class="row justify-content-center px-3 mb-3">
            <img id="logos" src="../assets/logo.png">
        </div>
        <div class="col-md-8 col-10 my-5">
            <form @submit.prevent="register">
                <div class="form-group">
                    <label class="form-control-label text-muted">Email</label>
                    <input v-model="email" type="text" id="email" name="email" placeholder="Enter your email" class="form-control"> </div>
                <div class="form-group">
                    <label class="form-control-label text-muted">Password</label>
                    <input v-model="password" type="password" id="psw" name="psw" placeholder="Enter your password" class="form-control"> </div>
                <div class="row justify-content-center my-3 px-3">
                    <button class="btn-block btn-color">Join us!</button>
                </div>
                    <!-- <p class="buah row justify-content-center" style="font-size: 12px" @click="changePage">cancel</p> -->
            </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const obj = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', obj)
        .then(response => {
          // console.log(response.data.access_token)
          localStorage.setItem('access_token', response.data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
