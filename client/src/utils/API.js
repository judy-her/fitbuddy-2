// route to get logged in user's info (needs the token)

  
  // make a search to google books api
  // https://www.googleapis.com/books/v1/volumes?q=harry+potter
  export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };  
  
  export const fetchCategories = () => {
    return fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5628ad94famsh5f6bc36e06fbb0dp175058jsnceb08da1012c',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
  };
  
  export const getExercises = (selectedCategory) => {
    const response = fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedCategory}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5628ad94famsh5f6bc36e06fbb0dp175058jsnceb08da1012c',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
    return response;
  };  
  
  export const getExercise = (exerciseId) => {
    const response = fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5628ad94famsh5f6bc36e06fbb0dp175058jsnceb08da1012c',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });
    return response;
  };