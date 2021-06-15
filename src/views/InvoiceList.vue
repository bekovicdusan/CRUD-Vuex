<template>
  <div class="container">
    <div class="row d-flex justify-content-center mx-5 my-3">
      <div class="col-10 d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column left-header">
          <h2>Invoices</h2>
          <small>
            There are {{ init.length }} total invoices.
          </small>
        </div>
        <div>
          <select name="" id="" class="mx-3">
            <option value="initial" selected>Filter by status</option>
            <option value="paid">Paid</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
          </select>
          <button class="btn btn-primary btn-rounded" data-bs-toggle="modal" data-bs-target="#newInvoiceModal">Add new invoice</button>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center my-3 mx-5" v-for="invoice of init" v-bind:key="invoice">
      <router-link v-bind:to="{name: 'Invoice', params:{id: invoice.id}}" class="router-link">
        <Invoice
          v-bind:clientName="invoice.clientName"
          v-bind:id="invoice.id"
          v-bind:items="invoice.items"
          v-bind:paymentDue="invoice.paymentDue"
          v-bind:total="invoice.total"
          v-bind:status="invoice.status"
        />
      </router-link>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="newInvoiceModal" tabindex="-1" aria-labelledby="newInvoiceModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newInvoiceModalLabel">Create invoice</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addEntry">
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
              <div class="item-list-wrapper d-flex flex-column justify-content-between align-items-center">
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
              <button type="submit" class="btn btn-primary my-3">Add New Invoice</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" ref="closeModal" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-secondary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Invoice from '../components/Invoice.vue'

export default {
  data () {
    return {
      uniqueId: 'DB1994',
      items: []
    }
  },
  computed: {
    ...mapGetters(['init'])
  },
  components: {
    Invoice
  },
  methods: {
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
    addEntry () {
      this.$refs.closeModal.click()
      this.$store.dispatch({
        type: 'addNewEntry',
        payload: {
          id: this.uniqueId,
          createdAt: '2021-06-14',
          paymentDue: '2021-04-20',
          description: this.descriptionModal,
          paymentTerms: this.paymentTermsModal,
          clientName: this.clientNameModal,
          clientEmail: this.clientEmailModal,
          status: 'pending',
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
          items: [
            {
              name: 'test item',
              quantity: '1',
              price: '420.66',
              total: '420.66'
            }
          ],
          total: '420.66'
        }
      })
    }
  }
}
</script>

<style scoped>
 .left-header h2 {
   text-align: left;
   font-weight: bold;
 }
 #newInvoiceModal .modal-content {
   width: 800px;
 }
 .router-link {
   text-align: center!important;
   text-decoration: none!important;
 }
 .delete-item {
   padding-top: 30px;
   margin-left: 10px;
 }
 .delete-item:hover {
   cursor: pointer;
 }
</style>
