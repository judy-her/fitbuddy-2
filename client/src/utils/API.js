  
  export const fetchCategories = () => {
    return fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2ec2b1e0a4msh5de7c9d75747adfp12c975jsna14c8ecd0fa0',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
  };
  
  export const getExercises = (selectedCategory) => {
    const response = fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedCategory}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2ec2b1e0a4msh5de7c9d75747adfp12c975jsna14c8ecd0fa0',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
    return response;
  };  
  
  export const getExercise = (exerciseId) => {
    const response = fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '2ec2b1e0a4msh5de7c9d75747adfp12c975jsna14c8ecd0fa0',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
    return response;
  };