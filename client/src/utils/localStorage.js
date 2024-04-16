import Auth from "../utils/auth";


export const getSavedBookIds = (id) => {
  const savedBookIds = localStorage.getItem(`${id}_saved_books`)
    ? JSON.parse(localStorage.getItem(`${id}_saved_books`))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr, id) => {
  if (bookIdArr.length) {
    localStorage.setItem(`${id}_saved_books`, JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem(`${id}_saved_books`);
  }
};

export const removeBookId = (bookId, id) => {
  const savedBookIds = localStorage.getItem(`${id}_saved_books`)
    ? JSON.parse(localStorage.getItem(`${id}_saved_books`))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem(`${id}_saved_books`, JSON.stringify(updatedSavedBookIds));

  return true;
};