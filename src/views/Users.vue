<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Usuarios</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <div id="table-div" class="mx-auto">
      <UsersTable v-if="users" :headers="headers" :items="users" :loading="loading" :error="error"/>
    </div>
</v-card>
</template>

<script>
import UserService from '../services/user.service'
import UsersTable from '../components/UsersTable.vue'
import generateMediaURL from '../services/firebase'
export default {
  name: 'UsersView',
  components: {
    UsersTable
  },
  data () {
    return {
      loading: true,
      headers: [
        { text: '#', value: 'id', sortable: true },
        { text: 'NOMBRE COMPLETO', value: 'user' },
        { text: 'CORREO ELECTRÓNICO', value: 'email', sortable: true },
        { text: 'DETALLE', value: 'operation' }
      ],
      users: []
    }
  },
  async mounted () {
    try {
      const response = await UserService.getUserList()
      this.users = response.data
    } catch {
      this.error = true
    }

    for (const index in this.users) {
      if (this.users[index].profileimage !== '') {
        this.users[index].avator = await generateMediaURL('users/' + this.users[index].profileimage)
      } else {
        this.users[index].avator = require('../assets/profile-pic.jpg')
      }
    };

    this.loading = false
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
