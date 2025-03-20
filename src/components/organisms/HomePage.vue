<script setup>
import FormStep from '@/components/molecules/FormSteps.vue'
</script>

<template>
  <main class="home">
    <FormStep />
  </main>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
</style>
