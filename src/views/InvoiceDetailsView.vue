<template>
  <div class="container">
    <router-link to="/invoices">Go Back</router-link>
    <InvoiceDetails v-bind:id="id"/>
  </div>
</template>

<script>
import InvoiceDetails from '../components/InvoiceDetails.vue'

export default {
  props: [
    'id'
  ],
  mounted () {
    console.log(this.id, 'invoiceview')
  },
  components: {
    InvoiceDetails
  }
}
</script>
