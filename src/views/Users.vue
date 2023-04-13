<template>
  <v-app-bar color=#C2C2C2 class="flex-grow-0" app dark>
      <v-app-bar-title>Listado de Usuarios</v-app-bar-title>
  </v-app-bar>

  <br>

  <div id="table-div" class="pl-15">
    <Table v-if="users" :headers="headers" :users="users" />
  </div>
</template>


<script>
  import UserService from '../services/user.service';
  import Table from '../components/Table.vue'
  export default {
    name: 'UsersList',
    components: {
      Table
    },
    data() {
      return {
        headers: [  
          { text: "ID", value: "id", sortable: true},
          { text: "FULLNAME", value: "fullname", sortable: true},
          { text: "EMAIL", value: "email", sortable: true},
        ],
        users: null
      }
    },
    created() {
      UserService.getUserList().then(
        (response) => {
          console.log(response.data);
          this.users = response.data;
        },
        (error) => {
        }
      );
    },
  }
</script>

<style>
#table-div {
  padding-top: 20px;
  max-width: 1200px;
}
</style>