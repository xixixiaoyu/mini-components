<template>
  <i class="v-icon" :style="style">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

defineOptions({
  name: 'VIcon',
});

const props = defineProps({
  size: {
    type: [Number, String],
  },
  color: {
    type: String,
  },
});

const style = computed<CSSProperties>(() => {
  const styles: CSSProperties = {};
  if (props.size) {
    styles.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size;
  }
  if (props.color) {
    styles.color = props.color;
  }
  return styles;
});
</script>
