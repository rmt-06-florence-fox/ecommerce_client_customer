<template>
  <div>
    <Navbar/>
    <div class="grid grid-cols-2 gap-2 border border-gray-200 p-2 rounded">
        <div class="flex border rounded bg-gray-300 items-center p-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <input type="text" placeholder="search by category..."
                    class="bg-gray-300 min-w-full focus:outline-none text-gray-700"/>
        </div>
    </div>
    <ContainerProduct/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import ContainerProduct from '../components/ContainerProduct'

export default {
  name: 'Home',
  components: {
    Navbar, ContainerProduct
  },
  created () {
    if (localStorage.getItem('access_token')) this.$store.commit('SET_isLogin', true)
  }
}
</script>
