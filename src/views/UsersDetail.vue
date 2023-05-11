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
    class="mx-5 my-5 rounded-sm"
  >
    <v-sheet :color="this.user.isBlocked ? '#FF0000' : '#9ACD32'" height="6"></v-sheet>
    <v-card-item>
      <v-row>
        <v-col cols="3" class="mt-2 mb-10"> 
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
              color="#8AB82D"
            >
              Cuenta de usuario
              <v-icon end icon="mdi-account-outline"></v-icon>
            </v-chip>
          </v-row>
          <v-row align="center">
            <v-chip
              class="my-1 mx-auto"
              color="#8AB82D"
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
          <v-row class="mt-7">
            <v-col cols="10" offset="2">
              <v-row class="ml-4 mb-1">
                <v-text-field
                  :value="user.id"
                  label="ID"
                  prepend-icon="mdi-pound"
                  readonly
                  variant="underlined"
                  persistent-placeholder
                ></v-text-field>
                <v-text-field
                  class="ml-4"
                  :value="user.id"
                  label="Fecha de registro"
                  prepend-icon="mdi-calendar-account-outline"
                  readonly
                  variant="underlined"
                  persistent-placeholder
                ></v-text-field>
              </v-row>
              <v-text-field
                class="ml-4"
                :value="user.fullname"
                label="Nombre completo"
                prepend-icon="mdi-run"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
              <v-text-field
                class="ml-4"
                :value="user.email"
                label="Correo electrónico"
                prepend-icon="mdi-email-outline"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
              <v-text-field
                class="ml-4"
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
            v-on:click="()=>isBlocked?unblockUser():blockUser()"
            class="my-2"
          >
            <v-icon class="mr-2">
              mdi-block-helper
            </v-icon>
            {{ isBlocked ? 'DESBLOQUEAR' : 'BLOQUEAR' }}
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
          this.user.isBlocked = false;
        },
        (error) => {
        }
      );
    },
    computed: {
      isBlocked() {
        return this.user.isBlocked
      }
    },
    methods: {
      blockUser() {
        this.user.isBlocked = true
      },
      unblockUser() {
        this.user.isBlocked = false
      }
    }
  }
</script>

<style>
.ml-4 .v-icon {
    color: #7CA528 !important;
}
</style>
