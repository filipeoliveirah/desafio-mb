<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { formatCNPJ, formatCPF, isValidCPF, formatPhone, isValidEmail } from '@/utils/formatters/index'

const currentStep = ref(0)
const isSubmitting = ref(false)
const errors = ref({})

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
  confirmPassword: ''
})

const handleDocument = (event, type) => {
  if (type === 'pf') {
    personTypePF.value.document = formatCPF(event.target.value)
  } else {
    personTypePF.value.document = formatCNPJ(event.target.value)
  }
}

const handlePhone = (event, type) => {
  const formatted = formatPhone(event.target.value)

  if (type === 'pf') {
    personTypePF.value.phone = formatted
  } else {
    personTypePJ.value.phone = formatted
  }
}

const validateStep = (step) => {
  errors.value = {}

  if (step === 0) {
    if (!initialData.value.email) {
      errors.value.email = 'E-mail é obrigatório'
      return false
    }
    if (!isValidEmail(initialData.value.email)) {
      errors.value.email = 'Formato de e-mail inválido'
      return false
    }
    if (!initialData.value.personType) {
      errors.value.personType = 'Selecione o tipo de pessoa'
      return false
    }
    return true
  }

  if (step === 1) {
    if (initialData.value.personType === 'pf') {
      if (!personTypePF.value.name) {
        errors.value.name = 'Nome é obrigatório'
        return false
      }
      if (!personTypePF.value.document) {
        errors.value.document = 'CPF é obrigatório'
        return false
      }
      if (!isValidCPF(personTypePF.value.document)) {
        errors.value.document = 'CPF inválido'
        return false
      }
    } else {
      if (!personTypePJ.value.socialName) {
        errors.value.socialName = 'Razão Social é obrigatória'
        return false
      }
      if (!personTypePJ.value.document) {
        errors.value.document = 'CNPJ é obrigatório'
        return false
      }
    }
    return true
  }

  if (step === 2) {
    if (!credentials.value.password) {
      errors.value.password = 'Senha é obrigatória'
      return false
    }
    if (credentials.value.password.length < 8) {
      errors.value.password = 'Senha deve ter no mínimo 8 caracteres'
      return false
    }
    if (!credentials.value.confirmPassword) {
      errors.value.confirmPassword = 'Confirme sua senha'
      return false
    }
    if (credentials.value.password !== credentials.value.confirmPassword) {
      errors.value.confirmPassword = 'As senhas não coincidem'
      return false
    }
    return true
  }

  return true
}

const handleSubmit = async () => {
  if (!validateStep(3)) return

  isSubmitting.value = true

  try {
    const formData = {
      email: initialData.value.email,
      personType: initialData.value.personType,
      ...(initialData.value.personType === 'pf' ? personTypePF.value : personTypePJ.value),
      password: credentials.value.password
    }

    // Log data or submit to API
    console.log('Form submitted:', formData)

    // toDo: implement API call
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Show success or redirect
    // alert('Cadastro realizado com sucesso!')
  } catch (error) {
    console.error('Error submitting form:', error)
    errors.value.submit = 'Erro ao enviar formulário. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}

const prevStep = () => {
  errors.value = {}
  currentStep.value -= 1
}

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    currentStep.value += 1
  }
}
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
        <input type="email" id="email" class="step__column--input" :class="{ 'error': errors.email }"
          v-model="initialData.email" autocomplete="email" />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="step__column">
        <span>Tipo de pessoa</span>
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
        <span v-if="errors.personType" class="error-message">{{ errors.personType }}</span>
      </div>
    </div>

    <!-- Second Step if PF -->
    <div class="step" v-show="currentStep === 1 && initialData.personType === 'pf'">
      <h2>Pessoa Física</h2>

      <div class="step__column">
        <label for="name">Nome</label>
        <input type="text" id="name" class="step__column--input" :class="{ 'error': errors.name }"
          v-model="personTypePF.name" />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="step__column">
        <label for="documentPF">CPF</label>
        <input type="text" id="documentPF" class="step__column--input" :class="{ 'error': errors.document }"
          v-model="personTypePF.document" @input="(e) => handleDocument(e, 'pf')" placeholder="000.000.000-00" />
        <span v-if="errors.document" class="error-message">{{ errors.document }}</span>
      </div>

      <div class="step__column">
        <label for="birthdayPF">Data de nascimento</label>
        <input type="date" id="birthdayPF" class="step__column--input" v-model="personTypePF.birthday" />
      </div>

      <div class="step__column">
        <label for="phonePF">Telefone</label>
        <input type="tel" id="phonePF" class="step__column--input" v-model="personTypePF.phone"
          @input="(e) => handlePhone(e, 'pf')" placeholder="(00) 00000-0000" />
      </div>
    </div>

    <!-- Second Step if PJ -->
    <div class="step" v-show="currentStep === 1 && initialData.personType === 'pj'">
      <h2>Pessoa Jurídica</h2>

      <div class="step__column">
        <label for="socialName">Razão Social</label>
        <input type="text" id="socialName" class="step__column--input" :class="{ 'error': errors.socialName }"
          v-model="personTypePJ.socialName" />
        <span v-if="errors.socialName" class="error-message">{{ errors.socialName }}</span>
      </div>

      <div class="step__column">
        <label for="documentPJ">CNPJ</label>
        <input type="text" id="documentPJ" class="step__column--input" :class="{ 'error': errors.document }"
          v-model="personTypePJ.document" @input="(e) => handleDocument(e, 'pj')" placeholder="00.000.000/0000-00" />
        <span v-if="errors.document" class="error-message">{{ errors.document }}</span>
      </div>

      <div class="step__column">
        <label for="foundationDate">Data de abertura</label>
        <input type="date" id="foundationDate" class="step__column--input" v-model="personTypePJ.foundationDate" />
      </div>

      <div class="step__column">
        <label for="phonePJ">Telefone</label>
        <input type="tel" id="phonePJ" class="step__column--input" v-model="personTypePJ.phone"
          @input="(e) => handlePhone(e, 'pj')" placeholder="(00) 00000-0000" />
      </div>
    </div>

    <!-- Third Step -->
    <div class="step" v-show="currentStep === 2">
      <h2>Senha de acesso</h2>

      <div class="step__column">
        <label for="password">Sua senha</label>
        <input type="password" id="password" class="step__column--input" :class="{ 'error': errors.password }"
          v-model="credentials.password" autocomplete="new-password" />
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
      </div>

      <div class="step__column">
        <label for="confirmPassword">Confirme sua senha</label>
        <input type="password" id="confirmPassword" class="step__column--input"
          :class="{ 'error': errors.confirmPassword }" v-model="credentials.confirmPassword"
          autocomplete="new-password" />
        <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
      </div>
    </div>

    <!-- Last Step -->
    <div class="step" v-show="currentStep === 3">
      <h2>Revise suas informações</h2>

      <div class="review-data">
        <p><strong>E-mail:</strong> {{ initialData.email }}</p>

        <template v-if="initialData.personType === 'pf'">
          <p><strong>Nome:</strong> {{ personTypePF.name }}</p>
          <p><strong>CPF:</strong> {{ personTypePF.document }}</p>
          <p v-if="personTypePF.birthday"><strong>Data de nascimento:</strong> {{ personTypePF.birthday }}</p>
          <p v-if="personTypePF.phone"><strong>Telefone:</strong> {{ personTypePF.phone }}</p>
        </template>

        <template v-else>
          <p><strong>Razão Social:</strong> {{ personTypePJ.socialName }}</p>
          <p><strong>CNPJ:</strong> {{ personTypePJ.document }}</p>
          <p v-if="personTypePJ.foundationDate"><strong>Data de abertura:</strong> {{ personTypePJ.foundationDate }}</p>
          <p v-if="personTypePJ.phone"><strong>Telefone:</strong> {{ personTypePJ.phone }}</p>
        </template>
      </div>

      <span v-if="errors.submit" class="error-message">{{ errors.submit }}</span>
    </div>

    <div class="step">
      <div class="step__row">
        <BaseButton v-if="currentStep > 0" variant="outline" @click="prevStep()" aria-label="Voltar"
          :disabled="isSubmitting">
          Voltar
        </BaseButton>
        <BaseButton v-if="currentStep < 3" @click="nextStep()" aria-label="Continuar" :disabled="isSubmitting">
          Continuar
        </BaseButton>
        <BaseButton v-if="currentStep === 3" @click="handleSubmit" :disabled="isSubmitting" aria-label="Cadastrar">
          {{ isSubmitting ? 'Enviando...' : 'Cadastrar' }}
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
    width: 100%;
    max-width: 20rem;
    text-align: center;
    margin-bottom: 1rem;

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

      &--input {
        padding: 0.5rem;
        border-radius: var(--border-radius);
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.1);
        color: var(--color-content);

        &.error {
          border-color: var(--color-danger);
        }

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }
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

  .error-message {
    color: var(--color-danger);
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }

  .review-data {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: var(--border-radius);

    p {
      margin: 0.5rem 0;
    }
  }
}
</style>
