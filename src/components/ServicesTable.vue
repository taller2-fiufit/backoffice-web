<template>
    <div>
      <DataTable
      :headers="headers"
      :items="items"
      :loading="loading"
      border-cell
      :empty-message= "error ? 'Ocurrió un error con el gateway.' : 'No hay servicios registrados con dichos filtros.'"
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center">

        <template #loading>
          <img
            :src="require('@/assets/loading-icon.gif')"
            style="width: 60px; height: 60px"
          />
        </template>

        <template #item-service="{ name, blocked }">
          <div class="user-wrapper">
            <v-icon v-if="!blocked" class="mr-2">
              mdi-cloud-print-outline
            </v-icon>
            <v-icon v-if="blocked" color="#FF0000" class="mr-2">
              mdi-cloud-cancel-outline
            </v-icon>
            <a target="_blank">{{ name }}</a>
          </div>
        </template>

        <template #item-up="{ up }">
          <a target="_blank">{{ up ? 'Si' : 'No' }}</a>
        </template>

        <template #header-up="header">
          <div class="filter-column">
            <img :src="require('../assets/filter.png')" class="filter-icon" @click.stop="showUpFilter=!showUpFilter">
            {{ header.text }}
            <div class="filter-menu" v-if="showUpFilter">
              <v-select
                variant="outlined"
                class="select"
                v-model="up_filtering"
                :items="['-', 'Si', 'No']"
              >
              </v-select>
            </div>
          </div>
        </template>

        <template #header-service="header">
          <div class="filter-column">
            <img :src="require('../assets/filter.png')" class="filter-icon" @click.stop="showBlockedFilter=!showBlockedFilter">
            {{ header.text }}
            <div class="filter-menu" v-if="showBlockedFilter">
              <v-select
                variant="outlined"
                class="select"
                v-model="blocked_filtering"
                :items="['-', 'Bloqueado', 'Desbloqueado']"
              >
              </v-select>
            </div>
          </div>
        </template>

        <template #item-actions="item">
          <div class="operation-wrapper">
            <v-btn
              color="#9ACD32"
              icon
              size="small"
              @click="goToServiceDetails(item.id)"
              class="my-2 ml-3"
            >
              <v-icon>
                mdi-eye
              </v-icon>
            </v-btn>

            <v-btn
              color="#9ACD32"
              icon
              size="small"
              @click="deleteService(item.id)"
              class="my-2 ml-3"
            >
              <v-icon>
                mdi-trash-can
              </v-icon>
            </v-btn>
          </div>
        </template>
      </DataTable>
    </div>
</template>

<script>
import ServicesService from '../services/services.service'
export default {
  name: 'ServicesTable',
  props: ['headers', 'items', 'loading', 'error'],
  data () {
    return {
      showBlockedFilter: false,
      showUpFilter: false,
      blocked_filtering: '-',
      up_filtering: '-'
    }
  },
  methods: {
    goToServiceDetails (id) {
      this.$router.push(`/services/${id}`)
    },
    deleteService (id) {
      ServicesService.deleteService(id).then(
        () => {
          this.$emit('delete_service', id)
        }
      )
    }
  },
  watch: {
    blocked_filtering: function (val) {
      this.showBlockedFilter = false
      if (val === 'Bloqueado') {
        this.$emit('change_block_filter', 'true')
      } else if (val === 'Desbloqueado') {
        this.$emit('change_block_filter', 'false')
      } else {
        this.$emit('change_block_filter', val)
      }
    },

    up_filtering: function (val) {
      this.showUpFilter = false
      if (val === 'Si') {
        this.$emit('change_up_filter', 'true')
      } else if (val === 'No') {
        this.$emit('change_up_filter', 'false')
      } else {
        this.$emit('change_up_filter', val)
      }
    }
  }
}
</script>

  <style>
  .customize-table {
    --easy-table-header-font-size: 13px;
    --easy-table-header-height: 45px;
    --easy-table-body-item-padding: 0px 13px 0px 0px;
    --easy-table-body-row-font-size: 15px;
  }

  .filter-icon {
    cursor: pointer;
    display: inline-block;
    width: 15px !important;
    height: 15px !important;
    margin-right: 4px;
  }

  .filter-menu {
    padding: 40px 30px;
    z-index: 1;
    position: absolute;
    top: 45px;
    width: 300px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
  }

  .filter-menu-select {
    padding: 20px 20px;
    z-index: 1;
    position: absolute;
    top: 45px;
    width: 200px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
  }

  .slider {
    margin-top: 15px;
  }

  .slider {
    --slider-tooltip-bg: #9ACD32;
    --slider-connect-bg: #9ACD32;
  }

  .select {
    margin: 0px 0px -22px 0px;
  }
  </style>
  <style src="@vueform/slider/themes/default.css"></style>
