<template>
  <header class="text-gray-100 bg-gray-900 body-font shadow w-full">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                <router-link to="/"
                    class="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">Home</router-link>
                <router-link to="/cart" v-if="isLogin"
                    class="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">My Cart</router-link>
                <router-link v-if="isLogin" to="/history" class="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600">My Payment History
                    </router-link>
            </nav>
            <a
                class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
                <img src="https://img2.pngdownload.id/20180716/zty/kisspng-shopping-bags-trolleys-computer-icons-logo-tool-bag-5b4ce1f2267377.6353026415317652341575.jpg" style="height: 40px; margin-top: 10px; margin-bottom: 10px;"
                    alt="logo">

                <span class="ml-3 text-xl">Belanjaan</span>
            </a>
            <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <a v-if="isLogin" @click="logout" href="#" class="bg-red-500 hover:bg-yellow-500 text-white ml-4 py-2 px-3 rounded-lg">
                    Logout
                </a>
                <router-link v-else to="/login" class="bg-green-500 hover:bg-black text-white ml-4 py-2 px-3 rounded-lg">
                    Login
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>

</style>
