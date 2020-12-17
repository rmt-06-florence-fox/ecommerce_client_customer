<template>
  <div>
    <Navbar/>
    <Alerts/>
    <HisoryTable/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Alerts from './Alert'
import HisoryTable from '../components/HistoryTable'

export default {
  name: 'HistoryPage',
  components: {
    Navbar, Alerts, HisoryTable
  },
  created () {
    if (localStorage.getItem('access_token')) this.$store.commit('SET_isLogin', true)
    this.$store.dispatch('getHistory')
  }
}
</script>

<style>

</style>
