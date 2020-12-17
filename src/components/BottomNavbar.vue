<template>
  <div>
    <nav class="navbar fixed-bottom navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/822/4281206822_be209932-fad6-4caa-8203-807240681ada.png?cb=1607775908" width="80" height="30" class="d-inline-block align-top" alt="" loading="lazy">
        </a>
        <div class="mx-auto">
            <p>total price : Rp {{ Price }}</p>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['Cart', 'Price']
}
</script>

<style>

</style>
