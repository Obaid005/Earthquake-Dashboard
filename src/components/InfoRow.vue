<template>
  <div class="info-row" :class="{ 'q-mb-md': spacing !== 'none', 'q-mb-sm': spacing === 'small' }">
    <q-icon
      v-if="icon"
      :name="icon"
      :size="iconSize"
      :color="iconColor"
      class="q-mr-sm info-row-icon"
    />
    <div class="info-row-content">
      <div v-if="label" class="text-caption text-grey-7 info-row-label">{{ label }}</div>
      <div class="info-row-value" :class="valueClass">
        <slot>{{ value }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InfoRowProps } from 'src/types/components';

withDefaults(defineProps<InfoRowProps>(), {
  iconSize: '20px',
  iconColor: 'primary',
  spacing: 'medium',
  valueClass: '',
});
</script>

<style scoped lang="scss">
@import 'src/styles/infoRow.scss';
</style>
