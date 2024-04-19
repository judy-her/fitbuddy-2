const { User, Category, Exercise } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (_, args, { user }) => {
      try {
        if (!user) {
          throw AuthenticationError;
        }

        const foundUser = await User.findById(user._id)
          .populate('savedExercises');
        return foundUser;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    categories: async () => {
      try {
        const categories = await Category.find()
          .populate('exercises');
        return categories;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
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

    saveExercise: async (_, args, { user }) => {
      if (!user) {
        throw AuthenticationError;
      }

      let exercise = await Exercise.findOne({ exerciseId: args.exerciseId });
      if (!exercise) {
        exercise = await Exercise.create({
          equipment: args.equipment,
          exerciseId: args.exerciseId,
          image: args.image,
          instructions:args.instructions,
          title: args.title,
        });
      }

      let category = await Category.findOneAndUpdate(
        {
          name: args.categoryName,
          exercises: { $ne: [exercise._id] }
        },
        {
          $addToSet: {
            exercises: exercise._id
          }
        },
        { new: true }
      );

      if (!category) {
        category = await Category.create(
          {
            name: args.categoryName,
            exercises: [exercise._id]
          });
      }

      await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { savedExercises: exercise._id } },
        { new: true, runValidators: true }
      );

      return exercise;
    },

    deleteExercise: async (_, { id }, { user }) => {
      if (!user) {
        throw AuthenticationError;
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedExercises:  id  } },
        { new: true }
      );

      return true;
    },
  },
};

module.exports = resolvers;