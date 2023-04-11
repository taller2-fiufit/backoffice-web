<template>
  <v-alert
    color="error"
    icon="$error"
    title="ERROR!"
    closable
  >
    {{error}}
  </v-alert>
</template>

<script>
  export default {
    name: 'ErrorAlert',
    props: ['error']
  }
</script>