class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userData) {
    // Validate user data here if needed
    return await this.userRepository.saveUser(userData);
  }

  async getUser(userId) {
    return await this.userRepository.getUser(userId);
  }
}

export default UserService;