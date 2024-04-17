const { User } = require('../models');
const resolvers = require('./resolvers');
const { signToken } = require('../utils/auth');

describe('Resolvers', () => {
  describe('Mutation.createUser', () => {
    it('should create a new user', async () => {
      // Test case for createUser resolver
      const user = await resolvers.Mutation.createUser(null, {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
      });

      // Assertions to verify the result
      expect(user).toHaveProperty('token');
      expect(user).toHaveProperty('user');
      expect(user.user).toHaveProperty('_id');
      expect(user.user.username).toBe('testuser');
      expect(user.user.email).toBe('test@example.com');
    });

    // Add more test cases for createUser or other resolver functions...
  });
});
