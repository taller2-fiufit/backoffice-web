<template>
  <div
    v-if="!users.length"
    class="text-center font-bold text-red-500 mt-16"
  >
    No hay usuarios registrados
  </div>
  <v-data-table 
    :headers="headers" 
    :items="users" 
    :total-items="users.length"
    rows-per-page-items="5"
    hide-action
    item-key="id"
  >
    <template v-slot:item.created_at="{ item }">
      {{ format(item.created_at) }}
    </template>
  </v-data-table>
</template>


<script>
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
          // Esto debería estar en methods en una pegada a GET/users
          users: [
            {
              id: 1,
              fullname: "Chiara Ciriani",
              email: "cciriani@fi.uba.ar",
              created_at: new Date('2023-04-04')
            }
          ]
      }
    },
    methods: {
      format (date) {
        date = new Date(date)
        const day = `${date.getUTCDate()}`.padStart(2, '0')
        const month = `${date.getUTCMonth() + 1}`.padStart(2, '0')
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
      }
    }
  }
</script>