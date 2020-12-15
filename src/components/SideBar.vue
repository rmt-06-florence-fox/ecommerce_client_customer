<template>
  <section class="header">
    <div class="side-menu">
        <ul>
            <a @click.prevent="$router.push({name: 'Home'})"><li>Products<i class="fa fa-angle-right ml-3"></i></li></a>
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
