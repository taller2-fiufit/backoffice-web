<template>
  <v-alert
    color="success"
    icon="$success"
    title="Registro exitoso!"
    closable
  >
    {{message}}
  </v-alert>
</template>
  
<script>
  export default {
    name: 'SuccessAlert',
    props: ['message']
  }
</script>