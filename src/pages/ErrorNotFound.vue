<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div class="error-not-found-container">
      <div class="error-code">404</div>

      <div class="text-h2 error-message">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="scss">
@import 'src/styles/errorNotFound.scss';
</style>
