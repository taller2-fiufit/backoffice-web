<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Servicios</v-app-bar-title>
  </v-app-bar>
  
  <v-card class="mx-5 my-5 rounded-sm">
    <div id="table-div" class="pl-15">
      <ServicesTable v-if="servicesList" :headers="headers" :items="servicesList" :loading="loading"/>
    </div>
  </v-card>
</template>
  
  
<script>
  import ServicesService from '../services/services.service';
  import ServicesTable from '../components/ServicesTable.vue'
  export default {
    name: 'Services',
    components: {
      ServicesTable
    },
    data() {
      return {
        headers: [  
          { text: "#", value: "id", sortable: true},
          { text: "NOMBRE", value: "name", sortable: true},
          { text: "DETALLE", value: "actions"}
        ],
        servicesList: [],
        loading: true
      }
    },
    async mounted() {
      let response = await ServicesService.getServiceList()
      this.servicesList = response.data;
      this.loading = false;
    }
  }
</script>

<style>
#table-div {
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
}

.rounded-sm {
  background: #F7F7F7;
}
</style>