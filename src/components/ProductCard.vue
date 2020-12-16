<template>
    <div class="max-w-xs mx-auto bg-white shadow-lg overflow-hidden">
        <div class="px-4 py-2 bg-white">
            <h1 class="text-black font-bold text-sm uppercase">{{product.name}}</h1>
            <!-- <p class="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p> -->
        </div>

        <img class="h-48 w-full object-cover" :src="product.image_url" alt="NIKE AIR" id="product">

        <div class="flex items-center justify-between px-4 py-2 bg-white">
            <h1 class="text-black font-bold text-sm">{{priceConverted}}</h1>
            <button class="px-2 py-1 bg-black text-xs text-white font-semibold uppercase border-transparent border-2 hover:bg-white hover:text-black hover:border-black focus:bg-white "><i class="lni lni-cart"></i></button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productCard',
  props: ['product'],
  computed: {
    priceConverted () {
      return 'Rp. ' + this.product.price
        .toString()
        .split('')
        .reverse()
        .map((el, i) => i % 3 === 0 && i !== 0 ? `${el}.` : el)
        .reverse()
        .join('') + ',00'
    }
  }
}
</script>

<style>
#product {
  object-fit: cover;
}
</style>
