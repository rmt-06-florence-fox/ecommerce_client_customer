<template>
<div class="navi">
  <b-navbar toggleable="lg" type="light" variant="white">
    <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->
  <router-link to="/home"><img src="../assets/logo.png" class="logo"></router-link>
    <b-navbar-toggle target="nav-collapse" variant="dark"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <!-- <b-nav-item-dropdown right> -->
          <!-- Using 'button-content' slot -->
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Daftar Guru dan Siswa</a></li>
            <li><a href="#">Jadwal</a></li>
            <li><a href="#">Toko</a></li>
            <li><a href="#">Keranjang</a></li>
            <li><a href="#" @click="logout">Logout</a></li>
          </ul>
          <!-- <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/store">Toko</router-link></li>
            <li><router-link to="/cart">Keranjang</router-link></li>
            <li><a href="#" @click="logout">Logout</a></li>
          </ul> -->

          <!-- <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  <!-- <header>
        <router-link to="/home"><img src="../assets/logo.png" class="logo"></router-link>
        <div class="toggle"></div>
        <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/store">Toko</router-link></li>
            <li><router-link to="/cart">Keranjang</router-link></li>
            <li><a href="#" @click="logout">Logout</a></li>
        </ul>
    </header> -->
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
@media (max-width: 950px) {
  .navi ul {
    display: inline-block !important;
  }
  .navi ul a {
       /* padding-top: 50px; */
       padding-bottom: 50px;
       margin: 0 !important;
  }
  /* header ul {
    display: none !important;
  } */
  /* .toggle {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url(../assets/menu.png);
    background-size: 30px;
    background-position: center;
    background-repeat: no-repeat;
    filter: invert(1)
  } */
}
.navi
{
    /* Left: 0; */
    /* padding: 20px 100px; */
    position: relative;
    /* float: top; */
    /* top: 0; */
    /* right: 40px; */
    /* width: 100%; */
    /* padding: 0px; */
    z-index: 11;
    /* margin: 0; */
    height: 0px;
    /* display: flex; */
    /* justify-content: space-between; */
    /* align-items: center; */
}
.navi .logo
{
    /* left: 50px; */
    position: relative;
    max-width: 100px;
}
.navi ul
{
    /* right: 50px; */
    display: flex;
}
.navi ul li
{
    list-style: none;
}
.navi ul li a
{
    display: inline-block;
    color: #333;
    font-weight: 400;
    margin-left: 40px;
    text-decoration: none;
}
</style>
