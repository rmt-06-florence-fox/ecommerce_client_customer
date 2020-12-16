<template>
  <!-- Column -->
    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

        <!-- Article -->
        <article class="overflow-hidden rounded-lg shadow-lg">

            <div>
                <img alt="Placeholder" class="block h-60 w-full" :src="item.image_url">
            </div>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline text-black">
                        {{ item.name }}
                    </a>
                </h1>
                <p class="text-grey-darker text-sm">
                    stock: {{ item.stock }}
                </p>
                <p class="text-grey-darker text-sm">
                    {{ item.category }}
                </p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <a class="flex items-center no-underline text-black">
                    <p class="ml-2 text-sm">
                        {{ item.price }}
                    </p>
                </a>
                <a class="no-underline text-grey-darker hover:text-red-dark" @click="postCart(item.id)">
                    <button class="hover:underline">Add to cart</button>
                </a>
            </footer>

        </article>
        <!-- END Article -->

    </div>
    <!-- END Column -->
</template>

<script>
export default {
  name: 'CardProduct',
  props: ['item'],
  methods: {
    postCart (id) {
      this.$store.dispatch('postProductId', id)
    }
  }
}
</script>

<style>

</style>
