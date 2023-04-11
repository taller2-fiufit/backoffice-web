<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    color="#9ACD32"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title=userFullname
        subtitle=userEmail
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
      v-for="item in items"
      :key="item.title"
      :to="item.route"
      link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'SidebarMenu',
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Usuarios', icon: 'mdi-account-group', route: '/users' },
        { title: 'Planes', icon: 'mdi-dumbbell', route: '/plans' },
        { title: 'Métricas', icon: 'mdi-poll', route: '/metrics' },
        { title: 'Registro de nuevos admins', icon: 'mdi-account-tie', route: '/register'}
      ],
      //userFullname: null,
      //userEmail: null
    }),
    //computed: {
    //  async currentUser() {
    //    let user = this.$store.state.auth.user;
    //    let userId = user.sub;
    //    let currentUserFullname = await this.$store.dispatch("userModule/getUserFullname", userId);
    //    this.userEmail = user.email;
    //    this.userFullname = currentUserFullname;
    //  },
    //},
  }
</script>