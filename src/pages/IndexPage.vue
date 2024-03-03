<template>
  <q-page class="main-page">
    <h1 class="main-page__title">Личный кабинет</h1>
    <InfoCards class="main-page__cards" />
    <InfoCharts />
  </q-page>
</template>

<script setup lang="ts">
import InfoCards from 'src/components/InfoCards.vue'
import InfoCharts from 'src/components/InfoCharts.vue'
</script>

<style lang="scss">
.main-page {
  background: #f9fafb;
  padding: 24px 16px;

  &__title {
    margin-bottom: 24px;
  }

  &__cards {
    margin-bottom: 16px;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    padding: 40px;

    &__title {
      margin-bottom: 32px;
    }
  }
}
</style>
