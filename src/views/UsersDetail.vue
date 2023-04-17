<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-card-actions>
      <v-btn icon @click="$router.back()"><v-icon color="#2b3c4b">mdi-keyboard-backspace</v-icon></v-btn>
    </v-card-actions>
    <v-app-bar-title color="#2b3c4b">Usuarios / {{user.fullname}}</v-app-bar-title>
  </v-app-bar>
  <v-card
    class="mx-5 my-5"
    variant="outlined"
    color="#9ACD32"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          OVERLINE
        </div>
        <div class="text-h6 mb-1">
          Headline
        </div>
        <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn variant="outlined">
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
  <ng-container>
  <div class="bg-white shadow overflow-hidden rounded-md">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div class="rich-text">
          <h2>Detalle de Usuario</h2>
        </div>
      </div>
      <div class="p-0">
        <dl>
          <!--ID-->
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">ID</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.user.id }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Títutlo</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.user.title }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Descripción</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.user.description }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Tipo</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.user.type }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Dificultad</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.user.difficulty }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </ng-container>
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
        },
        (error) => {
        }
      );
    }
  }
</script>