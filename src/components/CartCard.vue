<template>
  <li class="media d-flex align-items-center bg-white rounded p-2 shadow my-3 h-100">
    <img :src="cart.Product.image_url" class="mr-3 rounded" alt="Product's photo" width="100">
    <div class="media-body p-1">
        <button type="button" class="close float-right" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        <div class="text-left">
            <h5 class="mt-0 mb-0 text-dark">{{cart.Product.name}}</h5> 
        </div>
        <div class="text-left mt-2 d-flex flex-row justify-content-start align-items-center">
            <h5 class="text-muted mr-3 my-0">Quantit(ies): {{cart.quantity}}</h5>
            <button type="button" class="btn btn-secondary">Edit</button>
        </div>
        <div class="text-left mt-2 d-flex flex-row justify-content-start align-items-center">
            <h5 class="text-muted mr-3 my-0">Quantity:
            </h5>
            <form class="mt-1 d-flex flex-row justify-content-start align-items-start">
                <div class="form-group mr-2" style="width: 30%;">
                    <input type="number" class="form-control" v-model="quantity">
                </div>
                <button type="submit" class="btn btn-primary mr-1">Save</button>
                <button type="button" class="btn btn-danger">Cancel</button>
            </form>
        </div>
    </div>
  </li>
</template>

<script>
export default {

}
</script>

<style>

</style>
