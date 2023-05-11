<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Usuarios</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <div id="table-div" class="mx-auto">
      <UsersTable v-if="users" :headers="headers" :items="users" :loading="loading"/>
    </div>
</v-card>
</template>


<script>
  import UserService from '../services/user.service';
  import UsersTable from '../components/UsersTable.vue';
  import generateImageURL  from '../services/firebase';
  export default {
    name: 'UsersList',
    components: {
      UsersTable
    },
    data() {
      return {
        loading: true,
        headers: [  
          { text: "#", value: "id", sortable: true},
          { text: "USER", value: "user", sortable: true},
          { text: "EMAIL", value: "email", sortable: true},
          { text: "DETAIL", value: "operation" }
        ],
        users: []
      }
    },
    async mounted() {
      let response = await UserService.getUserList();
      this.users = response.data;

      for (var index in this.users) {
        try {
          this.users[index].avator = await generateImageURL('users/' + this.users[index].id + '/profile');
        } catch {
          this.users[index].avator = 'https://cdn.vuetifyjs.com/images/lists/1.jpg';
        }
      };

      this.loading = false
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