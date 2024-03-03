<template>
  <q-expansion-item
    label="Account settings"
    default-opened
    header-class="info-chart__header"
    expand-icon-class="info-chart__expand-icon"
    expand-icon="img:icons/accordion-arrow.svg"
  >
    <template v-slot:header>
      <div class="info-chart__title">
        Продажи по
        <span class="info-chart__title-accent">{{
          modeConfig[props.mode].title
        }}</span>
      </div>
    </template>
    <div ref="chartContainer" class="info-chart__chart-container">
      <v-chart autoresize class="info-chart__chart" :option="option" />
    </div>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type {
  TooltipComponentOption,
  GridComponentOption,
} from 'echarts/components'
import { formatNumber } from 'src/utils'

use([TooltipComponent, GridComponent, LineChart, CanvasRenderer])

type EChartsOption = ComposeOption<
  TooltipComponentOption | GridComponentOption | LineSeriesOption
>

interface Props {
  data?: [string, number | null][]
  mode?: 'byDay' | 'byMonth'
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
  mode: 'byDay',
})

const modeConfig = {
  byDay: {
    fill: '#F0F5FF',
    stroke: '#6395F9',
    formatterOptions: {
      month: 'numeric',
      day: 'numeric',
    },
    title: 'дням',
  },
  byMonth: {
    fill: '#D6F5E8',
    stroke: '#69DFAE',
    formatterOptions: {
      month: 'long',
    },
    title: 'месяцам',
  },
}
const borderColor = '#E4E7EC'
const option = ref<EChartsOption>({
  grid: {
    show: false,
    borderColor,
    top: 12,
    right: 0,
    bottom: 35,
    left: 65,
  },
  tooltip: {
    trigger: 'axis',
    confine: true,
    position: function (pt: [number, number]) {
      return [pt[0], '10%']
    },
    valueFormatter: (value) => formatNumber(value as number).toString(),
    axisPointer: {
      label: {
        formatter: function (params) {
          let date = new Date(params.value)
          return date.toISOString().split('T', 1)[0]
        },
      },
    },
  },
  xAxis: {
    type: 'time',
    boundaryGap: false,
    axisTick: {
      show: true,
      length: 8,
      lineStyle: {
        color: borderColor,
      },
    },
    splitNumber: 3,
    axisLabel: {
      color: '#98A2B3',
      margin: 15,
      lineHeight: 16,
      fontFamily: 'Inter Variable',
      formatter: function (timestamp: number) {
        const date = new Date(timestamp)
        const options = modeConfig[props.mode]
          .formatterOptions as Intl.DateTimeFormatOptions
        // Adjust timescale for byDay x-axis
        if (props.mode === 'byDay') {
          const dateNum = date.getDate()
          const rounded = [1, 31].includes(dateNum)
            ? dateNum
            : Math.ceil(dateNum / 5) * 5
          date.setDate(rounded)
        }
        return new Intl.DateTimeFormat('ru-RU', options).format(date)
      },
    },
    axisLine: {
      lineStyle: {
        color: borderColor,
      },
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#98A2B3',
      lineHeight: 24,
      fontFamily: 'Inter Variable',
      formatter: (value: number) => formatNumber(value),
    },
  },
  series: [
    {
      data: props.data,
      type: 'line',
      name: 'Продажи',
      areaStyle: {
        color: modeConfig[props.mode].fill,
      },
      emphasis: {
        disabled: true,
      },
      lineStyle: {
        color: modeConfig[props.mode].stroke,
        width: 1,
      },
      itemStyle: {
        opacity: 0,
      },
    },
  ],
})
</script>

<style lang="scss">
.info-chart {
  &__header {
    padding: 16px;
    background: $white;
    border-radius: 8px;
  }

  &__expand-icon {
    padding: 0;
    margin-bottom: 1px;

    i {
      font-size: 10px !important;
    }
  }

  &__title {
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
    padding-right: 8px;

    &-accent {
      color: #7226be;
    }
  }

  &__chart {
    background: $white;
    border-radius: 8px;
    height: 322px;
    width: 100%;

    &-container {
      background: $white;
      padding: 16px;
      padding-top: 0;
      border-radius: 0 0 8px 8px;
    }
  }

  @media screen and (min-width: $breakpoint-md-min) {
    &__header {
      pointer-events: none;
    }

    &__title-accent {
      color: inherit;
    }

    &__expand-icon {
      display: none;
    }
  }

  @media screen and (min-width: $breakpoint-lg-min) {
    &__header {
      padding: 24px;
    }

    &__chart {
      height: 340px;
      &-container {
        background: $white;
        padding: 24px;
        padding-top: 0;
      }
    }
  }
}
</style>
