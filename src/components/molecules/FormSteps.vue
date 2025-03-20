<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

const currentStep = ref(0)

const initialData = ref({
  email: '',
  personType: ''
})

const personTypePF = ref({
  name: '',
  document: '',
  birthday: '',
  phone: ''
})

const personTypePJ = ref({
  socialName: '',
  document: '',
  foundationDate: '',
  phone: ''
})

const credentials = ref({
  password: '',
})

const handleSubmit = () => {
}

const prevStep = () => {
  currentStep.value -= 1
}


const nextStep = () => {
  if (currentStep.value === 0 && !initialData.value.email) {
    alert('Por favor, preencha o e-mail antes de continuar.');
    return;
  }

  if (currentStep.value === 1) {
    if (initialData.value.personType === 'pf') {
      if (!personTypePF.value.name || !personTypePF.value.document) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }
    } else if (initialData.value.personType === 'pj') {
      if (!personTypePJ.value.socialName || !personTypePJ.value.document) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }
    }
  }

  if (currentStep.value === 2 && !credentials.value.password) {
    alert('Defina uma senha antes de continuar.');
    return;
  }

  currentStep.value += 1;
};


</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">

    <div class="stepper">
      Etapa
      <span class="stepper__current">
        {{ currentStep + 1 }}
      </span>
      de 4
    </div>

    <!-- First Step -->
    <div class="step" v-show="currentStep === 0">
      <h2>Seja bem-vindo(a)</h2>

      <div class="step__column">
        <label for="email">Endereço de e-mail</label>
        <input type="text" id="email" class="step__column--input" v-model="initialData.name" />
      </div>
      <div class="step__row">
        <div>
          <input type="radio" id="pf" value="pf" class="step__column--radio" v-model="initialData.personType" />
          <label for="pf">Pessoa física</label>
        </div>

        <div>
          <input type="radio" id="pj" value="pj" class="step__column--radio" v-model="initialData.personType" />
          <label for="pj">Pessoa jurídica</label>
        </div>
      </div>
    </div>

    <!-- Second Step if PF -->
    <div class="step" v-show="currentStep === 1 && initialData.personType === 'pf'">
      <h2>Pessoa Física</h2>

      <div class="step__column">
        <label for="name">Nome</label>
        <input type="text" id="name" class="step__column--input" v-model="personTypePF.name" />
      </div>

      <div class="step__column">
        <label for="document">CPF</label>
        <input type="text" id="document" class="step__column--input" v-model="personTypePF.document" />
      </div>

      <div class="step__column">
        <label for="birthday">Data de nascimento</label>
        <input type="text" id="birthday" class="step__column--input" v-model="personTypePF.birthday" />
      </div>

      <div class="step__column">
        <label for="phone">Telefone</label>
        <input type="text" id="phone" class="step__column--input" v-model="personTypePF.phone" />
      </div>
    </div>

    <!-- Second Step if PJ -->
    <div class="step" v-show="currentStep === 1 && initialData.personType === 'pj'">
      <h2>Pessoa Jurídica</h2>

      <div class="step__column">
        <label for="socialName">Razão Social</label>
        <input type="text" id="socialName" class="step__column--input" v-model="personTypePJ.socialName" />
      </div>

      <div class="step__column">
        <label for="document">CNPJ</label>
        <input type="text" id="document" class="step__column--input" v-model="personTypePJ.document" />
      </div>

      <div class="step__column">
        <label for="foundationDate">Data de abertura</label>
        <input type="text" id="foundationDate" class="step__column--input" v-model="personTypePJ.foundationDate" />
      </div>

      <div class="step__column">
        <label for="phone">Telefone</label>
        <input type="text" id="phone" class="step__column--input" v-model="personTypePJ.phone" />
      </div>
    </div>

    <!-- Third Step -->
    <div class="step" v-show="currentStep === 2">
      <h2>Senha de acesso</h2>

      <div class="step__column">
        <label for="email">Sua senha</label>
        <input type="password" id="email" class="step__column--input" v-model="credentials.name" />
      </div>
    </div>

    <!-- Last Step -->
    <div class="step" v-show="currentStep === 3">
      <h2>Revise suas informações</h2>

      <div class="step__column">
        <label for="email">Sua senha</label>
        <input type="password" id="email" class="step__column--input" v-model="credentials.name" />
      </div>
    </div>

    <div class="step">
      <div class="step__row">
        <BaseButton v-if="currentStep > 0 && currentStep < 3" variant="outline" @click="prevStep()">
          Voltar
        </BaseButton>

        <BaseButton v-if="currentStep < 3" @click="nextStep()">
          Continuar
        </BaseButton>

        <BaseButton v-if="currentStep === 3" @click="handleClick" :disabled="true">
          Cadastrar
        </BaseButton>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  color: var(--color-content);
  gap: 1rem;

  .stepper {
    &__current {
      font-weight: bold;
      color: var(--color-primary);
    }
  }

  .step {
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    gap: 1rem;
    width: 100%;

    &__row,
    &__column {
      display: flex;
      width: 100%;
      gap: 0.5rem;

      &--radio {
        margin-right: 0.5rem;
      }
    }

    &__row {
      flex-direction: row;
      justify-content: space-between;
    }

    &__column {
      flex-direction: column;
    }
  }
}
</style>
