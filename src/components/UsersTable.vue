<template>
  <div>
    <DataTable
    :headers="headers"
    :items="items"
    :loading="loading"
    border-cell
    :empty-message="error ? 'El servicio de usuarios se encuentra bloqueado o caído.' : 'No hay usuarios registrados con dichos filtros.'"
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center">

      <template #loading>
        <img
          :src="require('@/assets/loading-icon.gif')"
          style="width: 60px; height: 60px"
        />
      </template>

      <template #item-user="{ fullname, avator }">
        <div class="user-wrapper">
          <img class="avator" :src="avator" alt="" />
          <a target="_blank">{{ fullname }}</a>
        </div>
      </template>

      <template #item-operation="item">
        <div class="operation-wrapper">
          <v-btn
            color="#9ACD32"
            icon
            size="small"
            @click="goToUserDetails(item.id)"
            class="my-2 ml-3"
          >
            <v-icon>
              mdi-eye
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  props: ['headers', 'items', 'loading', 'error'],
  methods: {
    goToUserDetails (id) {
      this.$router
        .push(`/users/${id}`)
        .then(() => { this.$router.go() })
    }
  }
}
</script>

<style>

.customize-table {
  --easy-table-header-font-size: 13px;
  --easy-table-header-height: 45px;
  --easy-table-body-item-padding: 0px 13px 0px 0px;
  --easy-table-body-row-font-size: 15px;
}

.user-wrapper {
  padding: 8px;
  display: flex;
  align-items: center;
}
.avator {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
