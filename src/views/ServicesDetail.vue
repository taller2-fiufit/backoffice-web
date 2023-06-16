<template>
  <div v-if="this.service">
    <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
      <v-card-actions>
        <v-btn icon @click="$router.back()"><v-icon color="#2b3c4b">mdi-keyboard-backspace</v-icon></v-btn>
      </v-card-actions>
      <v-breadcrumbs :items="['Servicios', service.name]">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-app-bar>
    <v-card
    class="mx-5 my-5 rounded-sm"
    >
    <v-sheet :color="this.service.blocked ? '#FF0000' : '#9ACD32'" height="6"></v-sheet>
    <v-card-item>
      <v-row>
        <v-col cols="6" class="mt-2 mb-4">
          <div class="text-overline">
          Información del servicio
          </div>
          <v-row justify="center" class="mt-15">
            <div class="text-h5 font-weight-bold">
              <v-icon end icon="mdi-wrench-cog"></v-icon>
              {{ service.name }}
            </div>
          </v-row>
          <v-row v-if="this.service.blocked" justify="center" class="mt-4">
            <v-chip color='#FF0000' text-color="white"> BLOCKED </v-chip>
          </v-row>
        </v-col>
        <v-col>
          <v-btn
          color="#FF0000"
          size="small"
          v-on:click="()=>isBlocked?unblockService():blockService()"
          :disabled="block_loading"
          class="my-4 mr-4"
          >
            <v-icon class="mr-2">
              mdi-block-helper
            </v-icon>
            {{ isBlocked ? 'DESBLOQUEAR' : 'BLOQUEAR' }}
          </v-btn>
        </v-col>
        <v-divider vertical thickness="2"></v-divider>
        <v-col cols="8" offset="2" class="mt-10">
          <v-row>
            <v-col cols="4" class="ml-4">
              <v-text-field
                :value="service.id"
                label="ID"
                prepend-icon="mdi-pound"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                class="ml-4"
                :value="service.url"
                label="URL"
                prepend-icon="mdi-alphabetical-variant"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="ml-4">
              <v-text-field
                :value="service.path"
                label="PATH"
                prepend-icon="mdi-map-marker-path"
                readonly
                variant="underlined"
                persistent-placeholder
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
  </div>
</template>

<script>
  import ServicesService from '../services/services.service';

  export default {
    name: 'ServicesDetail',
    data() {
      return {
        service: null,
        loading: true,
        block_loading: false,
      }
    },
    async mounted() {
      let response = await ServicesService.getServiceById(this.$route.params.id);
      this.service = response.data;
      this.loading = false;
    },
    computed: {
      isBlocked() {
        return this.service.blocked
      }
    },
    methods: {
      blockService() {
        this.block_loading = true;
        ServicesService.blockService(this.service.id).then(
          (response) => {
            this.service.blocked = response.data.blocked;
            this.block_loading = false
          },
          (_) => [
            this.block_loading = false
          ]
        )
      },
      unblockService() {
        this.block_loading = true;
        ServicesService.unblockService(this.service.id).then(
          (response) => {
            this.service.blocked = response.data.blocked;
            this.block_loading = false
          },
          (_) => [
            this.block_loading = false
          ]
        )
      },
    }
  }
</script>

<style>
.rounded-sm {
  background: #F7F7F7;
}
.ml-4 .v-icon {
  color: #7CA528 !important;
}
.goalicon {
  color: #7CA528 !important;
}
</style>