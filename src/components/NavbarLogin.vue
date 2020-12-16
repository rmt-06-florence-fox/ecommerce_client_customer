<template>
    <div>
        <div class="navbar-custom">
            <div class="logo-navbar">
                <a @click="home" href="#">
                    <img src="../assets/output-onlinepngtools (1).png" alt="logo" width="170px">
                </a>
            </div>
            <div>
                <ul class="right-navbar">
                    <li><button type="button" class="btn btn-outline-primary text-light btn-sm"><a @click="pageLogin" class="button2" href="#">Login</a></button></li>
                    <li><button type="button" class="btn btn-warning btn-sm gradient-color"><a @click="pageRegister" class="button2" href="#">Register</a></button></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NavbarLogin',
  methods: {
    home () {
      this.$router.push('/')
    },

    pageLogin () {
      this.$router.push('/login')
    },

    pageRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
.navbar-custom {
    display: flex;
    background-color: #dcdde1;
    justify-content: space-between;
    padding: 0px;
}
.buttonRegistrsai {
    margin: 0%;
}
.right-navbar {
    display: flex;
    list-style: none;
    margin: 0%;
    padding: 0%;
}
.right-navbar a {
    color: white;
    padding: 10px;
}
.right-navbar li {
    margin: 8px;
}
.button1 {
    padding: 4px;
    width: 90PX;
}
.button2 {
    text-decoration: none;
    color: black;
}
.button1 li {
    text-decoration: none;
}
.color-page {
    background-color: #c8d6e5;
}
.gradient-color {
    background-image: linear-gradient(to right, #0097e6, #273c75);
}
</style>
