<template>
  <div>
    <v-container fluid>
      <p class="display-3 font-weight-light text-center pa-4">
        TRANSACTION HISTORY
      </p>
      <v-row>
        <v-col :cols="12" md="12" sm="12">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-center">No.</th>
                <th class="text-center">Transaction Code</th>
                <th class="text-center">Product(s)</th>
                <th class="text-center">Total</th>
                <th class="text-center">Date</th>
              </tr>
            </thead>
            <tbody v-for="el in transactions" :key="el.id">
              <HistoryRow
                :el="el"
              >
              </HistoryRow>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HistoryRow from '../components/HistoryRow'

export default {
  name: 'History',
  components: {
    HistoryRow
  },
  created () {
    this.$store.dispatch('getUserTransaction')
  },
  methods: {
  },
  computed: mapState(['transactions'])
}
</script>

<style>

</style>
