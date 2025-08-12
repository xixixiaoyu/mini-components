<template>
  <button
    class="v-button"
    :class="buttonClasses"
    :disabled="disabled || loading"
    type="button"
  >
    <VIcon v-if="loading" class="loading-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-dasharray="15"
          stroke-dashoffset="15"
          stroke-linecap="round"
          stroke-width="2"
          d="M12 3C16.9706 3 21 7.02944 21 12"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>
    </VIcon>
    <span>
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VIcon from '../Icon/VIcon.vue';

defineOptions({
  name: 'VButton',
});

interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'dashed' | 'default';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false,
});

const buttonClasses = computed(() => [
  `v-button--${props.type}`,
  `v-button--${props.size}`,
  { 'is-disabled': props.disabled, 'is-loading': props.loading },
]);
</script>

<style scoped>
.v-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: 32px;
  border-radius: var(--v-border-radius);
  border: 1px solid var(--v-border-color);
  background-color: var(--v-color-white);
  color: var(--v-text-color-regular);
  font-size: var(--v-font-size-medium);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.v-button.is-disabled,
.v-button.is-disabled:hover {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Types */
.v-button--primary {
  background-color: var(--v-color-primary);
  border-color: var(--v-color-primary);
  color: var(--v-color-white);
}
.v-button--success {
  background-color: var(--v-color-success);
  border-color: var(--v-color-success);
  color: var(--v-color-white);
}
.v-button--warning {
  background-color: var(--v-color-warning);
  border-color: var(--v-color-warning);
  color: var(--v-color-white);
}
.v-button--danger {
  background-color: var(--v-color-danger);
  border-color: var(--v-color-danger);
  color: var(--v-color-white);
}
.v-button--dashed {
  border-style: dashed;
}

/* Sizes */
.v-button--large {
  height: 40px;
  padding: 0 20px;
  font-size: var(--v-font-size-large);
}
.v-button--small {
  height: 28px;
  padding: 0 10px;
  font-size: var(--v-font-size-small);
}

.loading-spinner {
  animation: spin 1s linear infinite;
  margin-right: 6px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
