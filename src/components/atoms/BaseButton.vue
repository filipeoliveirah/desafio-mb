

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    :class="['base-button', `base-button--${props.variant}`]"
    :disabled="props.disabled"
    @click="$emit('click')"
  >
    <slot/>
  </button>
</template>

<style scoped>
.base-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--primary {
  background-color: var(--color-primary);
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.base-button--danger {
  background-color: var(--color-danger);
  color: white;
}

.base-button--danger:hover:not(:disabled) {
  background-color: var(--color-danger-hover);
}
</style>
