<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Usuarios</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <div id="table-div" class="mx-auto">
      <UsersTable v-if="users" :headers="headers" :items="users" />
    </div>
</v-card>
</template>


<script>
  import UserService from '../services/user.service';
  import UsersTable from '../components/UsersTable.vue'
  export default {
    name: 'UsersList',
    components: {
      UsersTable
    },
    data() {
      return {
        headers: [  
          { text: "#", value: "id", sortable: true},
          { text: "USER", value: "user", sortable: true},
          { text: "EMAIL", value: "email", sortable: true},
          { text: "DETAIL", value: "operation" }
        ],
        users: []
      }
    },
    created() {
      UserService.getUserList().then(
        (response) => {
          let data = response.data;
          for (var index in data) {
            data[index].avator = 'https://cdn.vuetifyjs.com/images/lists/1.jpg';
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
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
}

.rounded-sm {
  background: #F7F7F7;
}
</style>