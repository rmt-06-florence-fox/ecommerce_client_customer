<template>
  <div class="container">
        <div class="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto" style="width:700px; height:400px;">
            <div class="col-5"> <img src="../assets/glass.png" class="card-img-top rounded-circle"></div>
            <div class="col-7 ">
                <h3 class="mb-3">Login</h3> 
                <form @submit.prevent="login">
                    <div class="form-group">
                      <input v-model="payload.email"
                        type="email" class="form-control" placeholder="Email">
                    </div>
                    <div class="form-group">
                      <input  v-model="payload.password"   
                        type="password" class="form-control" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary rounded-pill float-right">Go</button>
                  </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name: 'LoginForm',
    data() {
        return {
            payload: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            const payload = {
                email: this.payload.email,
                password: this.payload.password
            }
            this.$store.dispatch('login', payload);
        },
        logout() {
            this.$store.dispatch('logout', payload);
        }
    }
}
</script>

<style>

</style>