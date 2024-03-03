<template>
  <div class="info-charts">
    <q-list class="info-charts__charts">
      <InfoChart :data="dateByDay" class="info-charts__chart" />
      <InfoChart :data="dateByMonth" mode="byMonth" />
    </q-list>
  </div>
</template>

<script setup lang="ts">
import InfoChart from 'src/components/InfoChart.vue'

const dateByDay: [string, number | null][] = [
  ['2024-01-31', null],
  ['2024-02-01', 10000],
  ['2024-02-02', 100000],
  ['2024-02-04', 122000],
  ['2024-02-05', 145030],
  ['2024-02-07', 294758],
  ['2024-02-09', 234758],
  ['2024-02-10', 199458],
  ['2024-02-11', 175758],
  ['2024-02-16', 134322],
]

const dateByMonth: [string, number | null][] = [
  ['2023-12-20', 71230],
  ['2024-01-01', 135000],
  ['2024-01-10', 100000],
  ['2024-01-20', 80000],
  ['2024-02-01', 149023],
  ['2024-02-10', 184923],
  ['2024-02-20', 294758],
  ['2024-03-01', 194592],
  ['2024-03-10', 354467],
  ['2024-03-20', 243949],
  ['2024-04-01', 104322],
  ['2024-04-10', 234943],
  ['2024-04-20', 145030],
]
</script>

<style lang="scss">
.info-charts {
  &__chart {
    margin-bottom: 16px;
  }

  @media screen and (min-width: $breakpoint-lg-min) {
    &__chart {
      margin-bottom: 0;
    }

    &__charts {
      display: grid;
      gap: 24px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
