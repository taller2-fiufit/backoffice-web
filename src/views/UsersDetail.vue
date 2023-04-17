<template>
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
              {{ this.plan[0].id }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Títutlo</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].title }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Descripción</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].description }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Tipo</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].type }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Dificultad</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].difficulty }}
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
      const userId = (this.$route.params.id).split(' ')[2];
      UserService.getUserInfoById(userId).then(
        (response) => {
          this.user = response.data;
        },
        (error) => {
        }
      );
    }
  }
</script>