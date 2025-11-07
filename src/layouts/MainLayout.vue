<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="header-gradient">
      <q-toolbar class="header-toolbar">
        <q-toolbar-title class="text-weight-bold">
          <q-icon name="public" size="28px" class="q-mr-sm" />
          Earthquake Dashboard
        </q-toolbar-title>
        <div class="text-caption text-white-7 q-mr-md">Powered by USGS</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// Layout component for the earthquake dashboard
</script>

<style scoped lang="scss">
@import 'src/styles/mainLayout.scss';
</style>
