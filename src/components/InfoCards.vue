<template>
  <div class="info-cards">
    <div class="info-cards__card" v-for="card in cards" :key="card.prop">
      <div
        :style="{ '--info-card__icon--background-color': card.backgroundColor }"
        class="info-cards__icon-container"
      >
        <img class="info-cards__icon" :src="`/icons/${card.icon}.svg`" />
      </div>
      <div>
        <p class="info-cards__title">{{ card.title }}</p>
        <p class="info-cards__count">
          {{ card.count ? formatNumber(card.count) : '-' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { formatNumber } from 'src/utils'
import { useMainStore } from 'src/stores/main'

const mainStore = useMainStore()
const { infoCards } = storeToRefs(mainStore)

mainStore.fetchInfoCards()

const cardInitialData = [
  {
    prop: 'goods',
    title: 'Товаров',
    icon: 'shopping-cart',
    backgroundColor: '#EFF8FF',
    count: 0,
  },
  {
    prop: 'catalogs',
    title: 'Каталогов',
    icon: 'bx_category-alt',
    backgroundColor: '#ECFDF3',
    count: 0,
  },
  {
    prop: 'brands',
    title: 'Брендов',
    icon: 'bx_star',
    backgroundColor: '#FFFAEB',
    count: 0,
  },
  {
    prop: 'sellers',
    title: 'Продавцов',
    icon: 'bx_store-alt',
    backgroundColor: '#FFF1F3',
    count: 0,
  },
]

const cards = computed(() => {
  if (!infoCards.value.length) {
    return cardInitialData
  } else {
    return cardInitialData.map((data) => {
      const info = infoCards.value.find((pr) => pr.prop === data.prop)
      if (info) {
        data.count = info.count
      }
      return data
    })
  }
})
</script>

<style lang="scss">
.info-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  &__card {
    background: $white;
    border-radius: 8px;
    padding: 14px 16px;
  }

  &__icon {
    width: 24px;
    height: 24px;

    &-container {
      margin-bottom: 8px;
    }
  }

  &__title {
    color: #667085;
    font-size: 14px;
    line-height: 20px;
  }

  &__count {
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
  }

  @media screen and (min-width: $breakpoint-lg-min) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    &__card {
      padding: 20px 24px;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__icon {
      margin-bottom: unset;

      &-container {
        border-radius: 50%;
        width: 56px;
        height: 56px;
        background-color: var(--info-card__icon--background-color, white);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: unset;
      }
    }

    &__title {
      margin-bottom: 4px;
    }

    &__count {
      font-size: 18px;
      line-height: 28px;
      font-weight: 600;
    }
  }
}
</style>
