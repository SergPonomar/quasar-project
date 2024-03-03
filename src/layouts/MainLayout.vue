<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="main-layout__header">
      <q-toolbar class="main-layout__toolbar">
        <q-btn
          class="main-layout__menu-btn q-mr-sm"
          padding="8px"
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-separator class="main-layout__separator" vertical />
        <q-toolbar-title class="main-layout__title">
          <img
            width="127"
            height="40"
            class="main-layout__logo main-layout__logo_header"
            src="images/datamp-logo.svg"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      class="bg-primary"
      show-if-above
      v-model="leftDrawerOpen"
      :width="288"
      :breakpoint="1038"
      side="left"
    >
      <header class="main-layout__drawer-header">
        <img
          width="127"
          height="40"
          class="main-layout__logo"
          src="images/datamp-logo.svg"
        />
      </header>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss">
.main-layout {
  $border-violet: #491979;

  &__toolbar {
    padding: 8px;
  }

  &__menu-btn {
    color: #c39beb;
  }

  &__header {
    background-color: $primary;
  }

  &__separator {
    background-color: $border-violet;
  }

  &__logo {
    display: block;
    width: 127px;
    height: 40px;
  }

  &__drawer-header {
    padding: 8px 16px;
    border-bottom: 1px solid $border-violet;
    margin-bottom: -1px;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    &__toolbar {
      padding: 0;
    }

    &__header {
      background-color: $white;
    }

    &__title {
      padding-top: 12px;
      padding-bottom: 12px;
      max-width: 288px;
      background-color: $primary;
      border-bottom: 1px solid $border-violet;
      margin-bottom: -1px;
    }

    &__drawer-header,
    &__menu-btn,
    &__separator {
      display: none;
    }

    &__logo {
      width: 152px;
      height: 48px;
    }
  }
}
</style>
