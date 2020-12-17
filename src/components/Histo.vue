<template>
  <tr>
    <td>
      <img style="height: 20rem" :src="histo.Product.image_url" :alt="histo.Product.image_url">
    </td>
    <td class="centering">{{histo.Product.name}}</td>
    <td class="centering">Rp. {{setLable(histo.Product.price)}}</td>
    <td class="centering">{{histo.amount}}</td>
    <td class="centering">Rp. {{setLable(histo.Product.price * histo.amount)}}</td>
    <td class="centering">{{(new Date(histo.updatedAt).toString()).split('GMT')[0]}}</td>
  </tr>
</template>

<script>
export default {
  name: 'Histo',
  props: ['histo'],
  methods: {
    setLable (price) {
      const harga = '' + price
      const label = harga.split('')
      let count = 0
      for (let i = label.length; i >= 0; i--) {
        if (i === label.length) {
          count++
          continue
        }
        if (count % 3 === 0) {
          label.splice(i, 0, '.')
        }
        count++
      }
      if (label[0] === '.') {
        label.shift()
      }
      return (label.join('') + ',00')
    }
  }
}
</script>

<style>
.centering {
  text-align: center;
  vertical-align: middle;
}
</style>
