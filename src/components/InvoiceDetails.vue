<template>
  <div class="details-container mx-auto">
    <div class="row mx-5 d-flex justify-content-center">
      <div class="col-10 d-flex justify-content-between align-items-center status-bar-wrapper p-4">
        <div class="status-side">
          <span>Status</span>
          <span class="badge bg-success mx-3 p-2">{{ invoice(id).status }}</span>
        </div>
        <div class="action-side">
          <button class="btn btn-light mx-3" data-bs-toggle="modal" data-bs-target="#editInvoiceModal">Edit</button>
          <button class="btn btn-warning" @click="deleteInvoice">Delete</button>
        </div>
      </div>
    </div>
    <div class="row mx-5 my-4 d-flex justify-content-center">
      <div class="col-10 d-flex flex-column justify-content-center align-items-center invoice-content-wrapper p-4">
        <div class="d-flex justify-content-between align-items-start w-100">
          <div class="invoice-info-left d-flex flex-column align-items-center justify-content-center">
            <strong>
              #{{ invoice(id).id }}
            </strong>
            <small>
              {{ invoice(id).description }}
            </small>
          </div>
          <div class="invoice-info-right d-flex flex-column justify-content-center align-items-end">
            <small>{{ invoice(id).clientAddress.street }}</small>
            <small>{{ invoice(id).clientAddress.city }}</small>
            <small>{{ invoice(id).clientAddress.postCode }}</small>
            <small>{{ invoice(id).clientAddress.country }}</small>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-start w-100 my-5">
          <div class="invoice-details-left d-flex flex-column align-items-center justify-content-between h-100">
            <div class="upper d-flex flex-column justify-content-start align-items-center">
              <small>Invoice Date</small>
              <span><strong>{{ invoice(id).createdAt }}</strong></span>
            </div>
            <div class="bottom d-flex flex-column justify-content-start align-items-center">
              <small>Payment Due</small>
              <span><strong>{{ invoice(id).paymentDue }}</strong></span>
            </div>
          </div>
          <div class="invoice-details-center d-flex flex-column align-items-start justify-content-center">
            <small>Bill to</small>
            <span><strong>{{ invoice(id).clientName }}</strong></span>
            <small>{{ invoice(id).senderAddress.street }}</small>
            <small>{{ invoice(id).senderAddress.city }}</small>
            <small>{{ invoice(id).senderAddress.postCode }}</small>
            <small>{{ invoice(id).senderAddress.country }}</small>
          </div>
          <div class="invoice-details-right d-flex flex-column justify-content-start align-items end">
            <small>
              Sent to
            </small>
            <span><strong>{{ invoice(id).clientEmail }}</strong></span>
          </div>
        </div>
        <div class="d-flex flex-column justify-content-between align-items-start w-100 m-3">
          <div class="d-flex flex-column justify-content-between w-100 items-div-wrapper p-4">
            <div class="d-flex justify-content-between align-items-center">
              <small>Item Name</small>
              <small>QTY.</small>
              <small>Price</small>
              <small>Total</small>
            </div>
            <div class="d-flex justify-content-between align-items-center my-3" v-for="item of invoice(id).items" v-bind:key="item">
              <small><strong style="color: black!important;">{{ item.name }}</strong></small>
              <small><strong>{{ item.quantity }}</strong></small>
              <small><strong>{{ item.price }}</strong></small>
              <small><strong style="color: black!important;">{{ item.total }}</strong></small>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-between w-100 total-div-wrapper p-4">
            <small><strong style="color: white!important">Amount Due</strong></small>
            <h3><strong>${{ invoice(id).total }}</strong></h3>
          </div>
        </div>
      </div>
    </div>
        <!-- Modal -->
    <div class="modal fade" id="editInvoiceModal" tabindex="-1" aria-labelledby="editInvoiceModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editInvoiceModalLabel">Edit #{{ invoice(id).id }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateInvoice">
              <div class="bill-from-wrapper">
                <h3>Bill From</h3>
                <label for="streetAddressFrom" style="width: 100%">
                  Street Address
                  <input type="text" name="streetAddressFrom" v-model="streetAddressFrom" style="width: 100%">
                </label>
                <div class="d-flex justify-content-between my-3">
                  <label for="cityFrom">
                    City
                    <input type="text" name="cityFrom" v-model="cityFrom">
                  </label>
                  <label for="postCodeFrom" class="mx-3">
                    Post Code
                    <input type="text" name="postCodeFrom" v-model="postCodeFrom">
                  </label>
                  <label for="countryFrom">
                    Country
                    <input type="text" name="countryFrom" v-model="countryFrom">
                  </label>
                </div>
              </div>
              <div class="bill-to-wrapper my-3">
                <h3>Bill To</h3>
                <label for="clientNameModal" style="width: 100%">
                  Client's Name
                  <input type="text" name="clientNameModal" v-model="clientNameModal" style="width: 100%">
                </label>
                <label for="clientEmailModal" style="width: 100%">
                  Client's Email
                  <input type="email" class="my-3" name="clientEmailModal" v-model="clientEmailModal" style="width: 100%">
                </label>
                <label for="streetAddressTo" style="width: 100%">
                  Street Address
                  <input type="text" name="streetAddressTo" v-model="streetAddressTo" style="width: 100%">
                </label>
                <div class="d-flex justify-content-between my-3">
                  <label for="cityTo">
                    City
                    <input type="text" name="cityTo" v-model="cityTo">
                  </label>
                  <label for="postCodeTo" class="mx-3">
                    Post Code
                    <input type="text" name="postCodeTo" v-model="postCodeTo">
                  </label>
                  <label for="countryTo">
                    Country
                    <input type="text" name="countryTo" v-model="countryTo">
                  </label>
                </div>
              </div>
              <div class="invoice-details-wrapper">
                <div class="d-flex justify-content-between align-items-center">
                  <label for="invoiceDateModal" class="mx-3">
                    Invoice Date
                    <input type="text" name="invoiceDateModal" v-model="invoiceDateModal">
                  </label>
                  <label for="paymentTermsModal">
                    Payment Terms
                    <select name="paymentTermsModal" v-model="paymentTermsModal">
                      <option value="30" selected>Net 30 Days</option>
                      <option value="1">Net 1 Day</option>
                      <option value="7">Net 7 Days</option>
                      <option value="14">Net 14 Days</option>
                    </select>
                  </label>
                </div>
                <label for="descriptionModal" class="my-3" style="width: 100%">
                  Description
                  <input type="text" name="descriptionModal" v-model="descriptionModal" style="width: 100%">
                </label>
              </div>
              <div class="item-list-wrapper d-flex flex-column justify-content-start align-items-center">
                <div class="w-100">
                  <h3>Item List</h3>
                </div>
                <div class="d-flex justify-content-between align-items-center" v-for="(item, index) of items" v-bind:key="item">
                  <label for="itemNameModal" class="my-3" style="width: 100%">
                    Item Name
                    <input type="text" name="itemNameModal" v-model="items[index].name" style="width: 100%">
                  </label>
                  <label for="itemQuantityModal" class="my-3 mx-2" style="width: 100%">
                    QTY.
                    <input type="text" name="itemQuantityModal" v-model="items[index].quantity" style="width: 100%">
                  </label>
                  <label for="itemPriceModal" class="my-3 mx-2" style="width: 100%">
                    Price
                    <input type="text" name="itemPriceModal" v-model="items[index].price" style="width: 100%">
                  </label>
                  <div class="d-flex justify-content-between align-items-center">
                    <label for="itemTotalModal" class="my-3" style="width: 100%">
                      Total
                      <input type="text" name="descriptionModal" v-model="items[index].total" style="width: 100%">
                    </label>
                    <i class="bi bi-trash-fill delete-item" @click="deleteItem(index)"></i>
                  </div>
                </div>
                <button class="btn btn-info w-100 my-3" @click.prevent="addNewItem">Add New Item</button>
              </div>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" ref="closeEditModal" @click="cancelChanges" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceDetail',
  props: [
    'id'
  ],
  mounted () {
    console.log(this.invoice(this.id))
    this.cancelChanges()
  },
  data () {
    return {
      clientNameModal: '',
      clientEmailModal: '',
      invoiceDateModal: '',
      paymentDue: '',
      descriptionModal: '',
      paymentTermsModal: '',
      status: '',
      streetAddressFrom: '',
      cityFrom: '',
      countryFrom: '',
      postCodeFrom: '',
      streetAddressTo: '',
      cityTo: '',
      countryTo: '',
      postCodeTo: '',
      total: '',
      items: []
    }
  },
  computed: {
    invoice () {
      return invoice => this.$store.getters.getSpecificInvoice(invoice)
    }
  },
  methods: {
    cancelChanges () {
      this.streetAddressFrom = this.invoice(this.id).senderAddress.street
      this.clientNameModal = this.invoice(this.id).clientName
      this.clientEmailModal = this.invoice(this.id).clientEmail
      this.invoiceDateModal = this.invoice(this.id).createdAt
      this.paymentDue = this.invoice(this.id).paymentDue
      this.descriptionModal = this.invoice(this.id).description
      this.paymentTermsModal = this.invoice(this.id).paymentTerms
      this.status = this.invoice(this.id).status
      this.cityFrom = this.invoice(this.id).senderAddress.city
      this.countryFrom = this.invoice(this.id).senderAddress.country
      this.postCodeFrom = this.invoice(this.id).senderAddress.postCode
      this.streetAddressTo = this.invoice(this.id).clientAddress.street
      this.cityTo = this.invoice(this.id).clientAddress.city
      this.countryTo = this.invoice(this.id).clientAddress.country
      this.postCodeTo = this.invoice(this.id).clientAddress.postCode
      this.total = this.invoice(this.id).total
      this.items = this.invoice(this.id).items
    },
    addNewItem () {
      this.items.push({
        name: '',
        quantity: '',
        price: '',
        total: ''
      })
    },
    deleteItem (index) {
      const itemsCopy = [...this.items]
      itemsCopy.splice(index, 1)
      this.items = [...itemsCopy]
    },
    deleteInvoice () {
      this.$store.dispatch({
        type: 'removeInvoiceAction',
        invoiceId: this.id
      })
      this.$router.push('/invoices')
    },
    updateInvoice () {
      this.$store.dispatch({
        type: 'updateInvoiceAction',
        payload: {
          id: this.id,
          createdAt: this.invoiceDateModal,
          paymentDue: this.paymentDue,
          description: this.descriptionModal,
          paymentTerms: this.paymentTermsModal,
          clientName: this.clientNameModal,
          clientEmail: this.clientEmailModal,
          status: this.status,
          senderAddress: {
            street: this.streetAddressFrom,
            city: this.cityFrom,
            postCode: this.postCodeFrom,
            country: this.countryFrom
          },
          clientAddress: {
            street: this.streetAddressTo,
            city: this.cityTo,
            postCode: this.postCodeTo,
            country: this.countryTo
          },
          items: this.items,
          total: this.total
        }
      })
      this.$refs.closeEditModal.click()
      this.$router.push('/invoices')
    }
  }
}
</script>

<style scoped>
  small {
    color: #888888;
  }
  .status-bar-wrapper, .invoice-content-wrapper {
    border-radius: 10px;
    background: white;
  }
  .items-div-wrapper {
    background: #f8f8fb;
    border-radius: 10px 10px 0 0;
  }
  .total-div-wrapper {
    color: white;
    border-radius: 0 0 10px 10px;
    background: #3c2886;
  }
  .total-div-wrapper h3 {
    margin: 0!important;
  }
  .details-container {
    max-width: 950px;
    margin-top: 20px;
  }
  #editInvoiceModal .modal-content, #editInvoiceModal .modal-dialog {
    max-width: 800px;
    width: 800px;
  }
  .delete-item {
    padding-top: 30px;
    margin-left: 10px;
  }
  .delete-item:hover {
    cursor: pointer;
  }
</style>
