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
  export default {
    name: 'SidebarMenu',
    data: () => ({ 
      drawer: null,
      user_info: [
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: '',
          subtitle: '',
        },
      ],
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Usuarios', icon: 'mdi-account-group', route: '/users' },
        { title: 'Planes', icon: 'mdi-dumbbell', route: '/plans' },
        { title: 'Métricas', icon: 'mdi-poll', route: '/metrics' },
        { title: 'Registro de nuevos admins', icon: 'mdi-account-tie', route: '/register'}
      ],
      fullname: '',
      email: ''
    }),
    mounted() {
      UserService.getCurrentUserInfo().then(
        response => {
          this.user_info[0].title = response.data.fullname;
          this.user_info[0].subtitle = response.data.email;
        },
        error => {

        },
      )
    }
  }
</script>