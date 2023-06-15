<template>
    <div>
      <Datatable
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
            <div class="filter-menu filter-age-menu" v-if="showDifficultyFilter">
              <v-range-slider
                color="#9ACD32"
                :max="10"
                :min="0"
                :step="1"
                :modelValue="difficulty_filtering"
                @update:modelValue="updateDifficultyFiltering()"
                thumb-label="always"
              ></v-range-slider>
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
      </Datatable>
    </div>
</template>
  
  <script>
    export default {
      name: 'Table',
      data() {
        return {
          showDifficultyFilter: false,
        }
      },
      props: ['headers', 'items', 'loading', 'difficulty_filtering'],
      methods: {
        goToPlanDetails(id) {
          console.log(id);
          this.$router.push(`/plans/${id}`);
        },
        updateDifficultyFiltering() {
          this.$emit('updateDiffiCultyFiltering', difficulty_filtering)
        }
      },
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
  top: 50px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
}
.filter-age-menu {
  height: 40px;
}
</style>