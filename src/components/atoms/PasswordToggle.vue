<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: 'current-password'
  }
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

const toggleVisibility = () => {
  showPassword.value = !showPassword.value
}

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="password-field">
    <label v-if="props.label" :for="props.id" class="password-field__label">{{ props.label }}</label>
    <div class="password-field__container">
      <input :type="showPassword ? 'text' : 'password'" :id="id" class="password-field__input"
        :class="{ 'error': props.error }" :value="props.modelValue" @input="updateValue"
        :placeholder="props.placeholder" :autocomplete="props.autocomplete" />
      <button type="button" class="password-field__toggle" @click="toggleVisibility" tabindex="-1"
        aria-label="Toggle password visibility">

        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
          </path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>

      </button>
    </div>
    <span v-if="props.error" class="password-field__error">{{ props.error }}</span>
  </div>
</template>

<style scoped lang="scss">
.password-field {
  width: 100%;

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-content);
  }

  &__container {
    position: relative;
    width: 100%;
  }



  &__toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--color-content);
    opacity: 0.7;
    cursor: pointer;
    padding: 0.25rem;

    &:hover {
      opacity: 1;
    }
  }

  &__error {
    color: var(--color-danger);
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
}
</style>
