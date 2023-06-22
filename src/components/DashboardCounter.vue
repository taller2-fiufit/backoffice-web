<template>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <v-card class="mx-auto">
    <v-row>
      <v-col class="text-center mb-0 pb-0" cols="2">
        <v-row justify="center">
          <v-col cols="2">
            <v-sheet
              height="80"
              width="80"
              rounded
              :elevation="8"
              :color="color"
              class="mt-12"
            >
              <v-container fill-height fluid>
                <v-row>
                  <v-col class="text-center">
                    <v-icon size="45" color="white">{{ icon }}</v-icon>
                  </v-col>
                  </v-row>
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10" class="mt-13 text-center">
        <v-card-text>
          <div class="text-overline font-weight-medium" style="font-size: 15px !important">
            {{ title }}
          </div>
          <div class="text-headline font-weight-bold" style="font-size: 15px !important">
            {{ quantity }}
          </div>
        </v-card-text>
      </v-col>
      <v-col cols="12">
        <v-card-text>
          <v-divider class="mb-3"></v-divider>
          <v-icon
            class="mr-2"
            small
          >
            mdi-clock
          </v-icon>
          <span class="text-caption font-weight-light" style="font-size: 13px !important">Cantidad total</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'DashboardCounter',

  props: {
    title: {
      type: String
    },
    quantity: {
      type: Number
    },
    icon: {
      type: String
    },
    color: {
      type: String
    }
  }
}
</script>
