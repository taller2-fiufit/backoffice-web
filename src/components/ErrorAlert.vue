<template>
  <v-alert
    color="error"
    icon="$error"
    title="¡ERROR!"
  >
    {{error}}
  </v-alert>
  <br />
</template>
<script>
  export default {
    name: 'ErrorAlert',
    props: ['error']
  }
</script>