import UserApiRepository from '../infrastructure/adapters/api/UserApiRepository';

class UserApplicationService {
  constructor() {
    const apiURL = import.meta.env.VITE_API_SERVER;
    this.userRepository = new UserApiRepository(apiURL);
  }

  async sendUserData(userData) {
    try {
      const result = await this.userRepository.saveUser(userData);
      return result
    } catch (error) {
      console.error('Error in UserApplicationService:', error);
      throw error;
    }
  }
}

export default UserApplicationService;
