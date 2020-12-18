<template>
  <div>
    <Navbar/>
      <img src="https://www.dpmarketingcommunications.com/wp-content/uploads/2016/11/404-Page-Featured-Image.png" alt="" id="NotFound">
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
  #NotFound {
    margin-top: 70px;
  }
</style>
