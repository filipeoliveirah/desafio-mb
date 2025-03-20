import UserRepository from '@services/domain/ports/UserRepository';

class UserApiRepository extends UserRepository {
  constructor(apiUrl) {
    super();
    this.apiUrl = apiUrl;
  }

  async saveUser(userData) {
    try {
      const response = await fetch(`${this.apiUrl}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error saving user data');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Error saving user data: ' + error.message);
    }
  }

  async getUser(userId) {
    try {
      const response = await fetch(`${this.apiUrl}/users/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching user data');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Error fetching user data: ' + error.message);
    }
  }
}

export default UserApiRepository;
