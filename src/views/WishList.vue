<template>
<div class="flex justify-center my-6 h-full">
  <ErrorCard v-if="addCartErr" />
  <div class="flex flex-col w-full p-8 text-gray-800 bg-white pin-r pin-y md:w-4/5 lg:w-4/5">
    <div class="flex-1">
    <h1 class="text-center font-bold py-6 text-3xl">Your Wishlist</h1>
      <table class="w-full text-sm lg:text-base" cellspacing="0">
        <!-- <thead>
          <tr class="h-12 uppercase">
            <th class="hidden md:table-cell"></th>
            <th class="text-left">Your Wishlist</th> -->
            <!-- <th class="lg:text-right text-left pl-5 lg:pl-0">
              <span class="lg:hidden" title="Quantity">Qtd</span>
              <span class="hidden lg:inline">Quantity</span>
            </th>
            <th class="hidden text-right md:table-cell">Unit price</th>
            <th class="text-right">Total price</th> -->
          <!-- </tr>
        </thead> -->
        <tbody v-if="wishlists[0]">
          <WishlistCard v-for="(wish, idx) in wishlists" :key="idx" :wish="wish" :idx="idx" />
        </tbody>
        <tbody v-else>
            <tr>
            <!-- {{getWishedProduct}} -->
            <td>
            No WishList Data
            </td>
            </tr>
        </tbody>
      </table>
      <hr class="pb-6 mt-6">
    </div>
  </div>
</div>
</template>

<script>
import WishlistCard from '../components/wishlistcard'
import { mapState } from 'vuex'
import ErrorCard from '../components/ErrorCard'

export default {
  name: 'WishList',
  components: {
    WishlistCard,
    ErrorCard
  },
  computed: {
    ...mapState({
      wishlists: 'wishlists',
      addCartErr: 'addCartErr'
    })
  }
}
</script>

<style>

</style>
