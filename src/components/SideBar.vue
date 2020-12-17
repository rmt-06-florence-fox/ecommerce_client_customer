<template>
  <section class="header">
    <div class="side-menu">
        <ul>
          <a @click.prevent="$router.push({name: 'Home'})" ><li class="mr-3" style="border-style: solid; text-align:center; border-width: 10px">Products<i class="fa fa-angle-right ml-3"></i></li></a>
          <a @click.prevent="$router.push({name: 'Cart'})" ><li class="mr-3 mt-4" style="border-style: solid; text-align:center; border-width: 10px" >Cart<i class="fa fa-angle-right ml-3"></i></li></a>
          <a @click.prevent="$router.push({name: 'WishList'})" ><li class="mr-3 mt-4" style="border-style: solid; text-align:center; border-width: 10px">WishList<i class="fa fa-angle-right ml-3"></i></li></a>
        </ul>
    </div>
</section>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style>

</style>
