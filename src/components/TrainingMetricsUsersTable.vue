<template>
  <div>
    <DataTable
    :headers="headers"
    :items="items"
    border-cell
    empty-message="No hay entrenamientos creados por usuarios."
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center">
    </DataTable>
  </div>
</template>

<script>
export default {
  name: 'TrainingMetricsUsersTable',
  props: ['headers', 'items']
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
