<template>
  <div v-if="user">
    <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
      <v-card-actions>
        <v-btn icon @click="goToUsersList()"><v-icon color="#2b3c4b">mdi-keyboard-backspace</v-icon></v-btn>
      </v-card-actions>
      <v-breadcrumbs :items="['Usuarios', user.fullname]">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-app-bar>
    <v-card class="mx-5 my-5 rounded-sm">
      <v-sheet :color="isBlocked ? '#FF0000' : '#9ACD32'" height="6"></v-sheet>
      <v-card-item>
        <v-row>
          <v-col cols="3" class="mt-2 mb-10">
            <div class="text-overline">
              Foto de perfil
            </div>
            <v-row align="center" class="mt-2">
              <img
                :src=profile_pic
                class="rounded-circle mx-auto my-5"
              />
            </v-row>
            <p class="text-caption text-center mx-5 mt-3"> {{ user.description }} </p>
            <v-row justify="center" class="mt-5" v-if="user.city || user.country">
              <v-icon end icon="mdi-map-marker-outline" color="#8AB82D" class="mr-2"></v-icon>
            </v-row>
            <v-row justify="center" v-if="user.city || user.country">
              <div class="font-weight-bold" v-if="user.city && !user.country">
                {{ user.city }}
              </div>
              <div class="font-weight-bold" v-if="!user.city && user.country">
                {{ user.country }}
              </div>
              <div class="font-weight-bold" v-if="user.city && user.country">
                {{ user.city }}, {{ user.country }}
              </div>
            </v-row>
          </v-col>
          <v-divider vertical thickness="2"></v-divider>
          <v-col cols="7" class="mt-2 mb-4">
            <div class="text-overline mx-auto">
              Información del usuario
            </div>
            <v-row class="ml-8 mt-9">
              <v-col cols="10" offset="2">
                <v-row>
                  <v-col cols="5" class="ml-4">
                    <v-text-field
                      :value="user.id"
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
                      :value="user.createdAt.split('T')[0]"
                      label="Fecha de registro"
                      prepend-icon="mdi-calendar-account-outline"
                      readonly
                      variant="underlined"
                      persistent-placeholder
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5" class="ml-4">
                    <v-text-field
                      :value="user.fullname"
                      label="Nombre completo"
                      prepend-icon="mdi-run"
                      readonly
                      variant="underlined"
                      persistent-placeholder
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      class="ml-4"
                      :value="user.email"
                      label="Correo electrónico"
                      prepend-icon="mdi-email-outline"
                      readonly
                      variant="underlined"
                      persistent-placeholder
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="ml-4">
                    <v-text-field
                      :value="user.balance"
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
            </v-row>
          </v-col>
          <v-col align="right">
            <v-btn
              color="#FF0000"
              size="small"
              v-on:click="()=>isBlocked?unblockUser():blockUser()"
              :disabled="block_loading"
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
    <v-row>
      <v-col cols="6">
        <v-card class="ml-5 rounded-sm">
          <v-card-item>
            <div class="text-overline mt-3">
              Ubicación
            </div>
            <v-row align="center" class="mt-1 mb-3">
              <v-col cols="1"></v-col>
              <v-col cols="10" align="center">
                <GMapMap
                    :center="markers[0].position"
                    :zoom="15"
                    map-type-id="terrain"
                    style="width: 650px; height: 400px"
                >
                  <GMapMarker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      :clickable="true"
                      :icon="require('../assets/map-marker.png')"
                      @click="center=m.position"
                  />
                </GMapMap>
              </v-col>
              <v-col cols = "1"></v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mr-5 rounded-sm">
          <v-card-item>
            <v-tabs v-model="tab" height="40px" align-tabs="center" color="#9ACD32">
              <v-tabs-slider></v-tabs-slider>
              <v-tab value="followees">Seguidos</v-tab>
              <v-tab value="followers">Seguidores</v-tab>
            </v-tabs>
            <v-divider class="mx-7"></v-divider>
            <v-window v-model="tab" class="mt-4 mb-7 mx-15">
              <v-window-item value="followees">
                <div id="table-div" class="mx-auto">
                  <UsersTable v-if="following" :headers="headers" :items="following" :loading="loading"/>
                </div>
              </v-window-item>

              <v-window-item value="followers">
                <div id="table-div" class="mx-auto">
                  <UsersTable v-if="followers" :headers="headers" :items="followers" :loading="loading"/>
                </div>
              </v-window-item>
            </v-window>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserService from '../services/user.service'
import UsersTable from '../components/UsersTable.vue'
import generateMediaURL from '../services/firebase'
export default {
  name: 'UsersDetail',
  components: {
    UsersTable
  },
  data () {
    return {
      user: null,
      loading: true,
      profile_pic: require('../assets/profile-pic.jpg'),
      following: null,
      followers: null,
      headers: [
        { text: '#', value: 'id', sortable: true },
        { text: 'NOMBRE COMPLETO', value: 'user', sortable: true },
        { text: 'DETALLE', value: 'operation' }
      ],
      markers: [
        {
          position: {
            lat: null, lng: null
          }
        }
      ],
      block_loading: false,
      tab: null
    }
  },
  async mounted () {
    const userResponse = await UserService.getUserInfoById(this.$route.params.id)
    this.user = userResponse.data
    this.user.isBlocked = false
    this.user.balance = 0
    this.markers[0].position.lat = parseFloat(this.user.latitude)
    this.markers[0].position.lng = parseFloat(this.user.longitude)
    console.log(!(this.user.city || ''))
    console.log(this.user)
    if (this.user.profileimage !== '') {
      this.profile_pic = await generateMediaURL('users/' + this.user.profileimage)
    };

    const followingResponse = await UserService.getFollowingListById(this.$route.params.id)
    this.following = followingResponse.data
    for (const followingIndex in this.following) {
      if (this.following[followingIndex].profileimage !== '') {
        console.log(this.following[followingIndex].fullname)
        this.following[followingIndex].avator = await generateMediaURL('users/' + this.following[followingIndex].profileimage)
      } else {
        this.following[followingIndex].avator = require('../assets/profile-pic.jpg')
      }
    };

    const followersResponse = await UserService.getFollowersListById(this.$route.params.id)
    this.followers = followersResponse.data
    for (const followersIndex in this.followers) {
      if (this.followers[followersIndex].profileimage !== '') {
        this.followers[followersIndex].avator = await generateMediaURL('users/' + this.followers[followersIndex].profileimage)
      } else {
        this.followers[followersIndex].avator = require('../assets/profile-pic.jpg')
      }
    };

    this.loading = false
  },
  computed: {
    isBlocked () {
      return this.user.blocked
    }
  },
  methods: {
    async blockUser () {
      this.block_loading = true
      const blockResponse = await UserService.blockUser(this.user.id)
      this.user.blocked = blockResponse.data.blocked
      this.block_loading = false
    },
    async unblockUser () {
      this.block_loading = true
      const unblockResponse = await UserService.unblockUser(this.user.id)
      this.user.blocked = unblockResponse.data.blocked
      this.block_loading = false
    },
    goToUsersList () {
      this.$router.push('/users')
    }
  }
}
</script>

<style>
.ml-4 .v-icon {
  color: #7CA528 !important;
}
.rounded-sm {
  background: #F7F7F7;
}

.rounded-circle {
  width: 180px;
  height: 180px;
}
</style>
