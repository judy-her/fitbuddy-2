
export const fetchCategories = () => {
  return fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '68788e6872msh6d6e3e4429b17c2p110f25jsnb67f55d7b577',
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
        'X-RapidAPI-Key': '68788e6872msh6d6e3e4429b17c2p110f25jsnb67f55d7b577',
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
        'X-RapidAPI-Key': '68788e6872msh6d6e3e4429b17c2p110f25jsnb67f55d7b577',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    }
  );
  return response;
};
