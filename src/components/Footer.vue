<template>
  <div id="container">
    <div id="contacts">
      <div id="contacts--contact">
        <h3>
          Br<i class="fas fa-shoe-prints"></i>.Shoes
        </h3>
        <p>{{ mail }}</p>
        <p style="margin-top: -15px;">Jl. Panjangin Dikit, No. 10, Kel. Kemangsky, kec. Kems Pusat - kode pos: 114111110</p>
      </div>
      <div id="contacts--social">
        <div><h2><i class="fab fa-instagram"></i></h2></div>
        <div><h2><i class="fab fa-linkedin"></i></h2></div>
        <div><h2><i class="fab fa-telegram-plane"></i></h2></div>
      </div>
    </div>
    <div id="mentions">
      <p>{{ mention }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      mail: 'footcatinit@broshoes.com',
      mention: '2020 | prasetyarinaldi@student-H8'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

#container{
  padding-top:20px;
  margin-top:20px;
  width:100vw;
  color:white;
  background-color:#000000;
  display:flex;
  flex-direction:column;
  align-items:center;
}
#contacts{
  display:flex;
  justify-content:space-around;
  align-items:center;
  width:100%;
}
#contacts--contact{
  text-align:left;
}
#contacts--social{
  width:20%;
  display : flex;
  justify-content : space-between;
}
#contacts--social div{
  height:30px;
  width:30px;
  /* background-color:white; */
  border-radius:50%;
}
#mentions p {
  font-size: 0.80em;
}
</style>
