<template>
  <div v-if="user">
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-card-actions>
      <v-btn icon @click="$router.back()"><v-icon color="#2b3c4b">mdi-keyboard-backspace</v-icon></v-btn>
    </v-card-actions>
    <v-breadcrumbs :items="['Usuarios', user.fullname]">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </v-app-bar>
  <v-card
    class="mx-5 my-5"
    variant="outlined"
  >
    <v-card-item>
      <v-row>
        <v-col cols="3" class="mt-2 mb-4"> 
          <div class="text-overline">
            Foto de perfil
          </div>
          <v-row align="center">
            <v-img
              max-width="200"
              src='https://cdn.vuetifyjs.com/images/lists/1.jpg'
              class="rounded-circle mx-auto my-5"
            ></v-img>
          </v-row>
          <v-row align="center">
            <v-chip
              class="my-1 mx-auto"
              color="secondary"
              variant="outlined"
            >
              Cuenta de usuario
              <v-icon end icon="mdi-account-outline"></v-icon>
            </v-chip>
          </v-row>
          <v-row align="center">
            <v-chip
              class="my-1 mx-auto"
              color="primary"
              variant="outlined"
            >
              Cuenta de entrenador
              <v-icon end icon="mdi-account-star-outline"></v-icon>
            </v-chip>
          </v-row>
        </v-col>
        <v-divider vertical thickness="2"></v-divider>
        <v-col cols="7" class="mt-2 mb-4">
          <div class="text-overline mx-auto">
            Información del usuario
          </div>
          <v-row class="mt-1">
            <v-col cols="10" offset="2">
              <v-text-field
                class="ml-3"
                :value="user.id"
                label="ID"
                prepend-icon="mdi-pound"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
              <v-text-field
                class="ml-3"
                :value="user.fullname"
                label="Nombre completo"
                prepend-icon="mdi-run"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
              <v-text-field
                class="ml-3"
                :value="user.email"
                label="Correo electrónico"
                prepend-icon="mdi-email-outline"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
              <v-text-field
                class="ml-3"
                :value="user.id"
                label="Fecha de registro"
                prepend-icon="mdi-calendar-account-outline"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
              <v-text-field
                class="ml-3"
                :value="user.id"
                prefix="$"
                label="Saldo"
                prepend-icon="mdi-wallet-bifold-outline"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col align="right">
          <v-btn
            color="#FF0000"
            size="small"
            @click=""
            class="my-2"
          >
            <v-icon class="mr-2">
              mdi-block-helper
            </v-icon>
            BLOQUEAR
          </v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
  </div>
</template>
  
<script>
  import UserService from '../services/user.service';
  export default {
    name: 'UsersDetail',
    data() {
      return {
        user: null
      }
    },
    created() {
      UserService.getUserInfoById(this.$route.params.id).then(
        (response) => {
          this.user = response.data;
          console.log(this.user)
        },
        (error) => {
        }
      );
    }
  }
</script>
