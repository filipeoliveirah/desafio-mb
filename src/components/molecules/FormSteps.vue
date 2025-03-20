<script setup>
import { ref } from 'vue'

import {
  formatCPF, isValidCPF,
  formatCNPJ, isValidCNPJ,
  formatPhone, isValidPhone,
  isValidDate, isAtLeast18YearsOld,
  containsNumbers, isValidEmail
} from '@/utils/formatters/index'

import BaseButton from '@/components/atoms/BaseButton.vue'
import PasswordToggle from '@/components/atoms/PasswordToggle.vue'

const currentStep = ref(0)
const isSubmitting = ref(false)
const errors = ref({})
const showPassword = ref(false)

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

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}


const handleDocument = (event, type) => {
  if (type === 'pf') {
    personTypePF.value.document = formatCPF(event.target.value)
  } else {
    personTypePJ.value.document = formatCNPJ(event.target.value)
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

const validateBirthday = () => {
  errors.value.birthday = '';

  if (!personTypePF.value.birthday) {
    errors.value.birthday = 'Data é obrigatória';
    return false;
  }

  // Parse the date to check for year length
  const parts = personTypePF.value.birthday.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    // Check if year has more than 4 digits
    if (year.length !== 4 || isNaN(parseInt(year))) {
      errors.value.birthday = 'Ano inválido';
      return false;
    }
  }

  if (!isValidDate(personTypePF.value.birthday)) {
    errors.value.birthday = 'Data inválida';
    return false;
  }

  if (!isAtLeast18YearsOld(personTypePF.value.birthday)) {
    errors.value.birthday = 'Você deve ter pelo menos 18 anos';
    return false;
  }

  return true;
};

const validateStep = (step) => {

  if (step === 0) {
    errors.value.email = ''
    errors.value.personType = ''

    if (!initialData.value.email.trim()) {
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
    errors.value.name = ''
    errors.value.document = ''
    errors.value.birthday = ''
    errors.value.phone = ''
    errors.value.socialName = ''
    errors.value.foundationDate = ''

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

      if (!personTypePF.value.birthday) {
        errors.value.birthday = 'Data é obrigatória';
        return false;
      } else {
        const isValid = validateBirthday();
        if (!isValid) return false;
      }

      if (!personTypePF.value.phone) {
        errors.value.phone = 'Telefone é obrigatório'
        return false
      }

      if (!isValidPhone(personTypePF.value.phone)) {
        errors.value.phone = 'Formato de telefone inválido'
        return false
      }
    } else {
      if (!personTypePJ.value.socialName) {
        errors.value.socialName = 'Razão Social é obrigatória'
        return false
      }

      if (containsNumbers(personTypePJ.value.socialName)) {
        errors.value.socialName = 'Razão Social não pode conter números'
        return false
      }

      if (!personTypePJ.value.document) {
        errors.value.document = 'CNPJ é obrigatório'
        return false
      }

      if (!isValidCNPJ(personTypePJ.value.document)) {
        errors.value.document = 'CNPJ inválido'
        return false
      }

      if (!personTypePJ.value.foundationDate) {
        errors.value.foundationDate = 'Data de abertura obrigatória'
        return false
      }

      if (!personTypePJ.value.phone) {
        errors.value.phone = 'Telefone é obrigatório'
        return false
      }

      if (!isValidPhone(personTypePJ.value.phone)) {
        errors.value.phone = 'Formato de telefone inválido'
        return false
      }
    }
    return true
  }

  if (step === 2) {

    errors.value.password = ''
    errors.value.confirmPassword = ''

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
    // console.log('Form submitted:', formData)

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

    <div class="steps">
      <!-- First Step -->
      <div class="step" v-show="currentStep === 0 || currentStep === 3">
        <h2 v-if="currentStep !== 3">Seja bem-vindo(a)</h2>
        <h2 v-else>Revise suas informações</h2>

        <div class="step__column">
          <label for="email">Endereço de e-mail</label>
          <input type="email" id="email" class="step__column--input" :class="{ 'error': errors.email }"
            v-model="initialData.email" autocomplete="email" />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="step__column" v-if="currentStep !== 3">
          <div class="step__row">
            <div class="step__row">
              <input type="radio" id="pf" value="pf" class="step__column--radio" v-model="initialData.personType" />
              <label for="pf">Pessoa física</label>
            </div>

            <div class="step__row">
              <input type="radio" id="pj" value="pj" class="step__column--radio" v-model="initialData.personType" />
              <label for="pj">Pessoa jurídica</label>
            </div>
          </div>
          <span v-if="errors.personType" class="error-message">{{ errors.personType }}</span>
        </div>
      </div>

      <!-- Second Step if PF -->
      <div class="step" v-show="(currentStep === 1 || currentStep === 3) && initialData.personType === 'pf'">
        <h2 v-if="currentStep !== 3">Pessoa Física</h2>

        <div class="step__column">
          <label for="name">Nome</label>
          <input type="text" id="name" placeholder="Seu nome completo" class="step__column--input"
            :class="{ 'error': errors.name }" v-model="personTypePF.name" />
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
          <input type="date" id="birthdayPF" class="step__column--input" :class="{ 'error': errors.birthday }"
            v-model="personTypePF.birthday" @change="validateBirthday" />
          <span v-if="errors.birthday" class="error-message">{{ errors.birthday }}</span>
        </div>

        <div class="step__column">
          <label for="phonePF">Telefone</label>
          <input type="tel" id="phonePF" class="step__column--input" v-model="personTypePF.phone"
            @input="(e) => handlePhone(e, 'pf')" placeholder="(00) 00000-0000" />
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Second Step if PJ -->
      <div class="step" v-show="(currentStep === 1 || currentStep === 3) && initialData.personType === 'pj'">
        <h2 v-if="currentStep !== 3">Pessoa Jurídica</h2>

        <div class="step__column">
          <label for="socialName">Razão Social</label>
          <input type="text" id="socialName" placeholder="Preencha completamente" class="step__column--input"
            :class="{ 'error': errors.socialName }" v-model="personTypePJ.socialName" />
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
          <span v-if="errors.foundationDate" class="error-message">{{ errors.foundationDate }}</span>
        </div>

        <div class="step__column">
          <label for="phonePJ">Telefone</label>
          <input type="tel" id="phonePJ" class="step__column--input" v-model="personTypePJ.phone"
            @input="(e) => handlePhone(e, 'pj')" placeholder="(00) 00000-0000" />
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Third Step -->
      <div class="step" v-show="currentStep === 2 || currentStep == 3">
        <h2 v-if="currentStep !== 3">Senha de acesso</h2>

        <div class="step__column">
          <PasswordToggle id="password" label="Sua senha" v-model="credentials.password" :error="errors.password"
            autocomplete="new-password" placeholder="Digite sua senha" />
        </div>

        <div class="step__column" v-if="currentStep !== 3">
          <PasswordToggle id="confirmPassword" label="Confirme sua senha" v-model="credentials.confirmPassword"
            :error="errors.confirmPassword" autocomplete="new-password" placeholder="Digite novamente sua senha" />
        </div>
      </div>

      <div class="step">
        <div class="step__row mt-1">
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

  .stepper {
    width: 100%;
    max-width: 25rem;
    text-align: center;
    display: flex;
    gap: 0.5rem;

    &__current {
      font-weight: bold;
      color: var(--color-primary);
    }
  }

  .steps {
    display: flex;
    flex-direction: column;
    max-width: 25rem;
    gap: 1rem;
    width: 100%;
  }

  .step {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    &__row,
    &__column {
      display: flex;
      width: 100%;
      gap: 0.5rem;

      &--input {
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
      align-items: center;
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
