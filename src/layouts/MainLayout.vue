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

<style scoped>
.header-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.3);
}

.header-toolbar {
  padding-left: 24px;
  padding-right: 24px;
}

/* Mobile padding for header */
@media (max-width: 599px) {
  .header-toolbar {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}
</style>
