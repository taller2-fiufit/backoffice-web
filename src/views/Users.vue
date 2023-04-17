<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Usuarios</v-app-bar-title>
  </v-app-bar>

  <br>

  <div id="table-div" class="mx-auto">
    <Table v-if="users" :headers="headers" :items="users" />
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
          { text: "#", value: "id", sortable: true},
          { text: "USER", value: "user", sortable: true},
          { text: "EMAIL", value: "email", sortable: true},
          { text: "OPERATION", value: "operation" }
        ],
        users: null
      }
    },
    created() {
      UserService.getUserList().then(
        (response) => {
          let data = response.data;
          for (var index in data) {
            data[index].avator = "https://github.com/HC200ok/vue3-easy-data-table/blob/main/images/nba/Stephen.png?raw=true";
          }
          this.users = data
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