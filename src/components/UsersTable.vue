<template>
  <div>
    <Datatable
    :headers="headers"
    :items="items"
    border-cell
    empty-message="No hay usuarios registrados."
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center">
    
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
          <v-btn
            color="#9ACD32"
            icon
            size="small"
            @click=""
            class="my-2 ml-5"
          >
            <v-icon>
              mdi-trash-can
            </v-icon>
          </v-btn>
        </div>
      </template>
    </Datatable>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: ['headers', 'items'],
    methods: {
      goToUserDetails(id) {
        this.$router.push(`/users/${id}`);
      }
    }
  }
</script>

<style>

.customize-table {
  --easy-table-border: 2px solid #262626;
  --easy-table-row-border: 1px solid #262626;

  --easy-table-header-font-size: 18px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #ffffff;
  --easy-table-header-background-color: #2a394c;

  --easy-table-body-item-padding: 0px 10px 0px 0px;
  --easy-table-body-row-font-size: 15px;
}

.user-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.avator {
  margin-right: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}
</style>