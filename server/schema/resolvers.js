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

    fetchCategories: async () => {
      const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
          headers: {
            'x-rapidapi-key': '5628ad94famsh5f6bc36e06fbb0dp175058jsnceb08da1012c',
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
          }
        });

        const categories = JSON.parse(await response.text());
        return categories.map((categoryName, index) => ({
          id: index + 1, // You can use the index as the ID or generate unique IDs as needed
          name: categoryName,
          description: 'Default description',
          bodyPart: categoryName,
          gifUrl: 'Default gif URL'
        }));
    },

    fetchExercisesByCategory: async (_,{bodyType}) => {
      const response = fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyType}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '5628ad94famsh5f6bc36e06fbb0dp175058jsnceb08da1012c',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      });
      const categories = JSON.parse(await response.text());
      return categories.map((category) => ({
        id: category.id, // You can use the index as the ID or generate unique IDs as needed
        name: category.name,
        description: category.description,
        bodyPart: category.bodyPart,
        gifUrl: category.gifUrl
      }));
    }
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