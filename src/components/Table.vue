<template>
  <div>
    <Datatable
    :headers="headers"
    :items="users"
    border-cell
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center"
    />
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: ['headers', 'users']
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
</style>