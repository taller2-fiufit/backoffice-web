<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="white" class="elevation-1" height="70">
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>

      <v-img
        max-width="33"
        :src="require('@/assets/kinetix-logo.png')"
        alt="kinetix logo"
        class="ml-2 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

      <v-img
        max-width="70"
        :src="require('@/assets/kinetix-name.png')"
        alt="kinetix name"
        class="ml-2 pointer"
        @click="redirect('Dashboard')"
      ></v-img>
      <v-spacer></v-spacer>
      <EthOrUsd></EthOrUsd>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        expand-on-hover
        rail
        color="#9ACD32"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="redirect(item.route)"
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

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: 'Dashboard' },
        { title: 'Usuarios', icon: 'mdi-account-group', route: 'Users' },
        { title: 'Planes', icon: 'mdi-dumbbell', route: 'Plans' },
        { title: 'Métricas', icon: 'mdi-poll', route: 'Metrics' }
      ]
    }),

    methods: {
      redirect (routeName) {
        this.$router.push({ name: routeName })
      }
    }
  }
</script>