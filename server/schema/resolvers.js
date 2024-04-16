const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (_, args, { user }) => {
      try {
        if (!user) {
          throw AuthenticationError;
        }

        const foundUser = await User.findById(user._id);
        return foundUser;

      } catch (err) {
        console.log(err);
        throw err
      }
    },
  },

  Mutation: {
    createUser: async (_, {username, email, password}) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, args, { user }) => {
      if (!user) {
        throw AuthenticationError;
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },
    deleteBook: async (_, { bookId }, { user }) => {
      if (!user) {
        throw AuthenticationError;
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      return updatedUser;
    }
  }
}


module.exports = resolvers;