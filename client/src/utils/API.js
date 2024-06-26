// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

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
