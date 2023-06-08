<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    color="#E2E2E2"
  >
    <v-list>
      <v-list
        :items="user_info"
        item-props
        lines="three"
      >
        <template v-slot:subtitle="{ subtitle }">
          <div v-html="subtitle"></div>
        </template>
      </v-list>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
      v-for="item in items"
      :key="item.title"
      :to="item.route"
      link
      >
        <v-list-item-icon>
          <v-icon color="#9ACD32">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import UserService from '../services/user.service';
  import generateMediaURL  from '../services/firebase';
  export default {
    name: 'SidebarMenu',
    data: () => ({ 
      drawer: null,
      user_info: [{
        prependAvatar: require('../assets/profile-pic.jpg'),
        title: '',
        subtitle: '',
      }],
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Usuarios', icon: 'mdi-account-group', route: '/users' },
        { title: 'Planes', icon: 'mdi-dumbbell', route: '/plans' },
        { title: 'Métricas', icon: 'mdi-poll', route: '/metrics' },
        { title: 'Registro de nuevos admins', icon: 'mdi-account-tie', route: '/register'},
        { title: 'Solicitudes de verificación', icon: 'mdi-check-decagram', route: '/trainer-verification'}
      ],
      fullname: '',
      email: ''
    }),
    async mounted() {
      let response = await UserService.getCurrentUserInfo()
      this.user_info[0].title = response.data.fullname;
      this.user_info[0].subtitle = response.data.email;

      if (response.data.profileimage != "") {
        this.user_info[0].prependAvatar = await generateMediaURL('users/' + response.data.profileimage);
      };
    }
  }
</script>