<template>
  <h1> Lista de usuarios </h1>
  <v-table
    fixed-header
    height="300px"
    hover
  >
    <thead>
      <tr>
        <th class="text-left"> ID </th>
        <th class="text-left"> Fullname </th>
        <th class="text-left"> Email </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
      >
        <td>{{ user.id }}</td>
        <td>{{ user.fullname }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </tbody>
  </v-table>
</template>


<script>
  import UserService from '../services/user.service';
  export default {
    name: 'UsersList',
    data() {
      return {
        headers: [  
          { name: "ID", value: "id", align: "start", sortable: true},
          { name: "Fullname", value: "fullname", sortable: false},
          { name: "Email", value: "email", sortable: false},
          { name: "Created At", value: "created_at", sortable: true}
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
    methods: {
      format (date) {
        date = new Date(date)
        const day = `${date.getUTCDate()}`.padStart(2, '0')
        const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
      }
    },
  }
</script>