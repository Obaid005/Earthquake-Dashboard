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

<style scoped>
.info-row {
  display: flex;
  align-items: flex-start;
}

.info-row-icon {
  margin-top: 4px;
  flex-shrink: 0;
}

.info-row-content {
  flex: 1;
  min-width: 0;
}

.info-row-label {
  margin-bottom: 2px;
}

.info-row-value {
  word-break: break-word;
}
</style>
