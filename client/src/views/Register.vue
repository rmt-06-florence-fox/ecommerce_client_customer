<template>
  <div>
    <div class="container rounded-lg mt-5">
    <div class="row content d-flex justify-content-center">
      <div class="col-md-4" style="background-color: #B8F0F0; color: black;">
        <h3 class="m-3">Register</h3>
        <form>
            <div class="m-4">
                <label for="">Email</label>
                <input v-model="email" type="text" class="form-control">
            </div>
            <div class="m-4">
                <label for="">Password</label>
                <input v-model="password" type="password" class="form-control">
            </div>
            <button @click.prevent="register" class="btn btn-outline-dark m-2">Register</button>
        </form>
        <button @click.prevent="$router.push('/login')" class="btn btn-outline-dark m-2 mb-4">Already have an account</button>
      </div>
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
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
