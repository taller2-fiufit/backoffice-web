<template>
    <div>
      <Datatable
      :headers="headers"
      :items="items"
      border-cell
      empty-message="No hay planes registrados."
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center">
        <template #item-actions="item">
          <div class="operation-wrapper">
            <v-btn
              color="#9ACD32"
              icon
              size="small"
              @click="goToPlanDetails(item.id)"
              class="my-2 ml-3"
            >
              <v-icon>
                mdi-eye
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
        goToPlanDetails(id) {
          console.log(id);
          this.$router.push(`/plans/${id}`);
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
</style>