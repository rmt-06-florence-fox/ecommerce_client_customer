<template>
  <div class="col mt-2">
    <div class="card">
      <img :src="history.image_url" class="card-img-top" :alt="history.name">
      <div class="card-body">
        <h5 class="card-title">{{ history.name }}</h5>
        <p class="card-text border-secondary border border-5 border-left-0 border-right-0">{{ formatRupiah(history.price) }}</p>
        <p class="card-text">Quantity: {{ history.quantity }}</p>
        <p class="card-text">Date: {{ formatDate(history.createdAt) }}</p>
        <a href="" @click.prevent="deleteHistory(history.id)" class="btn btn-danger">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'HistoryCard',
  props: ['history'],
  data () {
    return {
    }
  },
  methods: {
    formatRupiah (price) {
      return `Rp. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00`
    },
    formatDate (date) {
      const d = new Date(date)
      const time = d.toString().split(' G')[0]
      return time
    },
    deleteHistory (HistoryId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            return this.$store.dispatch('deleteHistory', HistoryId)
          }
        })
        .then(({ data }) => {
          if (data) {
          // Swal.fire (
          //     "Added",
          //     "A new category has been added.",
          //     "success"
          // )
            Swal.fire({
              toast: true,
              icon: 'success',
              title: data.message,
              animation: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            this.$store.dispatch('fetchHistories')
          }
        })
        .catch((err) => {
          console.log(err)
          this.message = err.response.data.message
          this.error = true
          // this.$nextTick(()=> {
          //    this.$refs.error.$el.scrollIntoView();
          // });
        })
    }
  }
}
</script>

<style>

</style>
