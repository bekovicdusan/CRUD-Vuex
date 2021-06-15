<template>
  <div class="col-10 invoice-wrapper d-flex justify-content-between p-4 mx-auto">
    <div class="left-side ml-3">
      <span class="invoice-id">
        <strong>
          #{{ id }}
        </strong>
      </span>
      <span class="mx-3 payment-due">
        {{ paymentDue }}
      </span>
      <span class="mx-3 payment-due">
        {{ clientName }}
      </span>
    </div>
    <div class="right-side mr-3 d-flex justify-content-between">
      <span class="mx-3 total-span">
        <strong> ${{ total }} </strong>
      </span>
      <span class="badge mx-3 p-2" v-bind:class="whichClass">
        {{ status }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Invoice',
  props: [
    'id',
    'clientName',
    'items',
    'paymentDue',
    'total',
    'status'
  ],
  computed: {
    whichClass: function () {
      return {
        'bg-warning': this.status === 'pending',
        'bg-dark': this.status === 'draft',
        'bg-success': this.status === 'paid'
      }
    }
  }
  // components: {
  //   Item
  // }
}
</script>

<style scoped>
  .invoice-wrapper {
    border-radius: 10px;
    background: white;
    border: 1px solid white;
  }
  .invoice-wrapper:hover {
    border: 1px solid #25358f;
    cursor: pointer;
  }
  .invoice-id, .invoice-id strong, .total-span, .total-span strong {
    color: black!important;
    text-decoration: none!important;
    -ms-text-underline-position: unset!important;
    text-underline-position: unset!important;
    text-decoration-thickness: 0!important;
    text-decoration-style: none!important;
    text-decoration-line: none!important;
  }
  .invoice-wrapper .payment-due {
    color: #888888!important;
  }
</style>
