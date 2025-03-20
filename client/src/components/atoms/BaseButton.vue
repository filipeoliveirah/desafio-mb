<script setup>

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline', 'danger', ''].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<template>
  <button :class="['base-button', `base-button--${props.variant}`]" :disabled="props.disabled" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.base-button {
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 10px 20px;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;


  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background-color: var(--color-primary);
    color: white;
  }

  &--primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  &--outline {
    border: 1px solid var(--color-primary);
    background-color: transparent;
    color: var(--color-primary);
  }

  &--outline:hover:not(:disabled) {
    border: 1px solid var(--color-primary-hover);
    background-color: transparent;
    color: var(--color-primary-hover);
  }

  &--danger {
    background-color: var(--color-danger);
    color: white;
  }

  &--danger:hover:not(:disabled) {
    background-color: var(--color-danger-hover);
  }
}
</style>
