class User {
  constructor(email, personType, additionalData = {}) {
    this.email = email;
    this.personType = personType;
    this.additionalData = additionalData;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPersonType() {
    return this.personType;
  }

  setPersonType(personType) {
    this.personType = personType;
  }

  getAdditionalData() {
    return this.additionalData;
  }

  setAdditionalData(additionalData) {
    this.additionalData = additionalData;
  }

  toJSON() {
    return {
      email: this.email,
      personType: this.personType,
      ...this.additionalData,
    };
  }
}

export default User;