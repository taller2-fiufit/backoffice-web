<template>
    <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
        <v-app-bar-title>Solicitudes de verificación de entrenadores</v-app-bar-title>
    </v-app-bar>
    <v-row>
        <v-col cols="4" v-for="(trainer, i) in trainers" :key="i">
            <v-card class="mx-5 mt-5 rounded-sm">
                <v-sheet color='#9ACD32' height="6"></v-sheet>
                <v-row>
                    <v-col cols="5" class="mt-2 mb-10 ml-1">
                        <v-row align="center" class="mt-2">
                            <img
                                @click="goToUserDetails(trainer.id)"
                                :src=trainer.profile_pic
                                class="rounded-circle mx-auto mt-5 mb-3 imagen_trainer"
                            />
                        </v-row>
                        <v-row justify="center">
                            <div class="text-overline">
                                {{ trainer.name }}
                            </div>
                        </v-row>
                    </v-col>
                    <v-divider vertical thickness="2" class="my-7"></v-divider>
                    <v-col align-self="center" class="mb-3">
                        <p class="text-caption text-center mx-5 mb-12"> "{{ trainer.reason }}" </p>
                        <v-row justify="center">
                            <v-btn
                                color="#9ACD32"
                                size="small"
                                class="mr-2"
                            >
                                <v-icon class="mr-2">
                                    mdi-close
                                </v-icon>
                                ACEPTAR
                            </v-btn>
                            <v-btn
                                color="#FF0000"
                                size="small"
                            >
                                <v-icon class="mr-2">
                                    mdi-close
                                </v-icon>
                                DENEGAR
                            </v-btn>
                        </v-row>
                    </v-col>

                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'TrainerVerification',
        data() {
            return {
                trainers: [
                    {
                        name: 'Marcelo Fontana',
                        profile_pic: require('../assets/profile-pic.jpg'),
                        reason: 'Quiero ser entrenador reconocido porque blabla etcetc.',
                        id: 1,
                    },
                    {
                        name: 'Marcelo Fontana',
                        profile_pic: require('../assets/profile-pic.jpg'),
                        reason: 'Quiero ser entrenador reconocido porque blabla etcetc.',
                        id: 1,
                    },
                    {
                        name: 'Marcelo Fontana',
                        profile_pic: require('../assets/profile-pic.jpg'),
                        reason: 'Quiero ser entrenador reconocido porque blabla etcetc.',
                        id: 1,
                    },
                    {
                        name: 'Marcelo Fontana',
                        profile_pic: require('../assets/profile-pic.jpg'),
                        reason: 'Quiero ser entrenador reconocido porque blabla etcetc.',
                        id: 1,
                    },
                    {
                        name: 'Marcelo Fontana',
                        profile_pic: require('../assets/profile-pic.jpg'),
                        reason: 'Quiero ser entrenador reconocido porque blabla etcetc.',
                        id: 1,
                    },
                ]
            }
        },
        methods: {
            goToUserDetails(id) {
                this.$router
                .push(`/users/${id}`)
                .then(() => { this.$router.go() })
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

.imagen_trainer {
  width: 100px;
  height: 100px;
}
</style>