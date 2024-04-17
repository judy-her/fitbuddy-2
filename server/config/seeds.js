const db = require('./connection');
const { User, Exercise, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Exercise', 'exercises');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Cardio' },
    { name: 'Strenth Training' },
    { name: 'Flexibility' },
    { name: 'High-Intensity HIIT' },
    { name: 'Chest' },
  ]);

  console.log('categories seeded');

  const exercises = await Exercise.insertMany([
    {
      title: 'Cycling',
      category: categories[0]._id,
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
      image: 'jpeg in assets',
      equipment: [],
    },
    {
      title: 'Swimming',
      category: categories[0]._id,
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
      image: 'jpeg in assets',
      equipment: [],
    },
    {
      title: 'Squats',
      category: categories[1]._id,
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
      image: 'jpeg in assets',
      equipment: [],
    },
    {
      title: 'Pull-Ups',
      category: categories[1]._id,
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
      image: 'jpeg in assets',
      equipment: [],
    },
    // {
    //   name: 'Pilates',
    //   category: categories[2]._id,
    //   description:
    //     'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
    //   image: 'jpeg in assets',
    //   date: 2024,
    //   quantity: 3,
    // },
    // {
    //   name: 'Static Stretching',
    //   category: categories[2]._id,
    //   description:
    //     'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
    //   image: 'jpeg in assets',
    //   date: 2024,
    //   quantity: 3,
    // },
    // {
    //   name: 'Burpees',
    //   category: categories[3]._id,
    //   description:
    //     'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
    //   image: 'jpeg in assets',
    //   date: 2024,
    //   quantity: 3,
    // },
    // {
    //   name: 'Mountain Climbers',
    //   category: categories[3]._id,
    //   description:
    //     'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
    //   image: 'jpeg in assets',
    //   date: 2024,
    //   quantity: 3,
    // },
    // {
    //   name: 'Push-Ups',
    //   category: categories[4]._id,
    //   description:
    //     'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
    //   image: 'jpeg in assets',
    //   date: 2024,
    //   quantity: 4,
    // },
    // {
    //   name: 'Bench Press',
    //   category: categories[4]._id,
    //   description:
    //     'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis.',
    //   image: 'jpeg in assets',
    //   date: 2024,
    //   quantity: 2,
    // },
  ]);

  console.log('exercises seeded');

  await User.create({
    username: 'JohnDoe',
    email: 'john@testmail.com',
    password: 'password12345',
    // orders: [
    //   {
    //     exercises: [exercises[0]._id, exercises[2]._id, exercises[1]._id],
    //   },
    // ],
  });

  await User.create({
    username: 'William',
    email: 'will@testmail.com',
    password: 'password12345',
    // orders: [
    //   {
    //     exercises: [exercises[3]._id, exercises[4]._id, exercises[2]._id],
    //   },
    // ],
  });

  console.log('users seeded');

  process.exit();
});
