
export const fetchCategories = () => {
  return fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '512ee0aacamsh7a407feedf48123p1b1ac8jsn48d2ae56ac6f',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  });
};

export const getExercises = (selectedCategory) => {
  const response = fetch(
    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedCategory}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '512ee0aacamsh7a407feedf48123p1b1ac8jsn48d2ae56ac6f',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    }
  );
  return response;
};

export const getExercise = (exerciseId) => {
  const response = fetch(
    `https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`,
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '512ee0aacamsh7a407feedf48123p1b1ac8jsn48d2ae56ac6f',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    }
  );
  return response;
};
