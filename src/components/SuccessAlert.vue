<template>
  <v-alert
    color="success"
    icon="$success"
    title="¡REGISTRO EXITOSO!"
  >
    {{message}}
  </v-alert>
  <br />
</template>
  
<script>
  export default {
    name: 'SuccessAlert',
    props: ['message']
  }
</script>