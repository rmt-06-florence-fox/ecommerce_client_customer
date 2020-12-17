<template>
  <tr>
    <td>
      <v-list-item
        :key="item.id"
      >
        <v-list-item-avatar>
          <v-img :src="item.Product.image_url"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title >{{item.Product.name}}</v-list-item-title>
          <v-list-item-subtitle>{{item.Product.Category.name}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </td>
    <td>Rp. {{item.Product.price}}</td>
    <td>
      <v-btn @click="minusCart(item.id)" icon>
        <v-icon small>
          mdi-minus-circle
        </v-icon>
      </v-btn>
      {{item.quantity}}
      <v-btn @click="plusCart(item.id)" icon>
        <v-icon small>
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </td>
    <td>Rp. {{item.Product.price * item.quantity}}</td>
    <td>
      <v-btn @click="deleteCart(item.id)" icon>
        <v-icon medium>
          mdi-delete
        </v-icon>
      </v-btn>
    </td>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </tr>
</template>

<script>
export default {
  name: 'CartRow',
  data () {
    return {
      deleteId: -1,
      dialogDelete: false
    }
  },
  methods: {
    minusCart (id) {
      this.$store.dispatch('minusCart', id)
    },
    plusCart (id) {
      this.$store.dispatch('plusCart', id)
    },
    deleteCart (id) {
      this.deleteId = id
      this.dialogDelete = true
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.deleteId = -1
      })
    },
    deleteItemConfirm () {
      const id = this.deleteId

      this.$store.dispatch('deleteCart', id)
      this.closeDelete()
    }
  },
  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  props: ['item', 'confirm']
}
</script>

<style>

</style>
