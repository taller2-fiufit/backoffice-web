<template>
    <div>
      <DataTable
      :headers="headers"
      :items="items"
      :loading="loading"
      border-cell
      empty-message="No hay planes registrados."
      table-class-name="customize-table"
      header-text-direction="center"
      body-text-direction="center">

        <template #loading>
          <img
            :src="require('@/assets/loading-icon.gif')"
            style="width: 60px; height: 60px"
          />
        </template>

        <template #header-difficulty="header">
          <div class="filter-column">
            <img :src="require('../assets/filter.png')" class="filter-icon" @click.stop="showDifficultyFilter=!showDifficultyFilter">
            {{ header.text }}
            <div class="filter-menu filter-difficulty-menu" v-if="showDifficultyFilter">
              <Slider
                :max="10"
                :min="0"
                :step="1"
                v-model="difficulty_filtering"
                class="slider"
              />
            </div>
          </div>
        </template>

        <template #header-type="header">
          <div class="filter-column">
            <img :src="require('../assets/filter.png')" class="filter-icon" @click.stop="showTypeFilter=!showTypeFilter">
            {{ header.text }}
            <div class="filter-menu-select" v-if="showTypeFilter">
              <v-select
                variant="outlined"
                class="select"
                v-model="type_filtering"
                :items="['all', 'walk', 'running']"
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
              @click="goToPlanDetails(item.id)"
              class="my-2 ml-3"
            >
              <v-icon>
                mdi-eye
              </v-icon>
            </v-btn>
          </div>
        </template>
      </DataTable>
    </div>
</template>

<script>
import Slider from '@vueform/slider'
export default {
  name: 'PlansTable',
  components: {
    Slider
  },
  data () {
    return {
      showDifficultyFilter: false,
      showTypeFilter: false,
      difficulty_filtering: [0, 10],
      type_filtering: 'all'
    }
  },
  props: ['headers', 'items', 'loading'],
  methods: {
    goToPlanDetails (id) {
      console.log(id)
      this.$router.push(`/plans/${id}`)
    },
    changeDifficultyFiltering () {
      this.$emit('change_diff_filter', this.difficulty_filtering)
    }
  },
  watch: {
    difficulty_filtering: function (val) {
      this.showDifficultyFilter = false // para pensar
      this.$emit('change_diff_filter', val)
    },
    type_filtering: function (val) {
      this.showTypeFilter = false // para pensar
      this.$emit('change_type_filter', val)
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
.filter-difficulty-menu {
  height: 35px;
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
