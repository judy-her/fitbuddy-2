import { useState, useEffect, useId } from 'react';
import { useMutation,useQuery,useLazyQuery } from "@apollo/client";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveBook, searchGoogleBooks,getExercises,getExercise } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { QUERY_CATEGORIES,QUERY_EXERCISES_BY_CATEGORIES } from "../utils/queries";

const SearchBooks = () => {
  
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [exercisesList, setExercisesList] = useState([]);
  const [selectedExercise, setExercise] = useState('');
  const [exerciseInfo, setExerciseInfo] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState([]);
  const [userId, setUserId] = useState('');

  const { loading, error, data } = useQuery(QUERY_CATEGORIES);
  useQuery(QUERY_EXERCISES_BY_CATEGORIES, {
    variables: { bodyType: selectedCategory },
    skip: !buttonClicked, // Skip the query if the button hasn't been clicked
    onCompleted: (data) => {
      // Update exercisesList with fetched data
      setExercisesList(data.fetchExercisesByCategory);
    },
  });

  useEffect(() => {
    if (Auth.loggedIn()) {
      const {data: {_id}} = Auth.getProfile();
      setUserId(_id);
      setSavedBookIds(getSavedBookIds(_id));
    }
  }, []);

  useEffect(() => {
    saveBookIds(savedBookIds, userId);
  }, [savedBookIds]);  

  useEffect(() => {
    if (!loading && data && !buttonClicked) {
      setCategories(data.fetchCategories);
    }
  }, [loading, data]);


  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    setButtonClicked(true);
  };
  
  const handleFormSubmitExercise = async (event) => {
    event.preventDefault();
    const { loading: exercisesLoading, error: exercisesError, data: exercisesData } = useQuery(QUERY_EXERCISES_BY_CATEGORIES, {
      variables: { bodyType: selectedCategory },
    });
    // Check if loading is true
    if (loading) {
      // Handle loading state
      console.log('Loading...');
      return;
    }

    // Check if there's an error
    if (error) {
      // Handle error state
      console.error('Error:', error);
      return;
    }

    // Data is available here
    const exercisesList = data.fetchExercisesByCategory;
    setExercisesList(exercisesList);
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!userId) {
      return false;
    }

    try {
      // const response = await saveBook(bookToSave, token);
      await addBook({
        variables: { ...bookToSave },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Select Category!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Select
                  name='searchInput'
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  size='lg'
                  aria-label='Select a category'
                >
                  <option value=''>Select a category</option>
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  {/* Add more options as needed */}
                </Form.Select>
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Get Exerices
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      {exercisesList.length > 0 && (
        <div className="text-light bg-dark p-5">
          <Container>
            <h1>Select Exercise!</h1>
            <Form onSubmit={handleFormSubmitExercise}>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Select
                    name='searchInput'
                    value={selectedExercise}
                    onChange={(e) => setExercise(e.target.value)}
                    size='lg'
                    aria-label='Select a exercise'
                  >
                    <option value=''>Select a exercise</option>
                    {exercisesList.map(exercise => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
                    {/* Add more options as needed */}
                  </Form.Select>
                </Col>
                <Col xs={12} md={4}>
                  <Button type='submit' variant='success' size='lg'>
                    Get Exercise info
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      )}
      <Container>
        <h2 className='pt-5'>
          {exerciseInfo 
            ? `Viewing results:`
            : 'Choose excercise you want'}
        </h2>
        <Row>
            <Col md="4" key={exerciseInfo.id}>
                <Card border='dark'>
                  {exerciseInfo.gifUrl ? (
                    <Card.Img src={exerciseInfo.gifUrl} alt={`The cover for ${exerciseInfo.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{exerciseInfo.name}</Card.Title>
                    <p className='small'>Category: {exerciseInfo.bodyPart}</p>
                    {/* <Card.Text>{exerice.description}</Card.Text> */}
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === exerciseInfo.id)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(exerciseInfo.id)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === exerciseInfo.id)
                          ? 'This Exercise has already been saved!'
                          : 'Save this Exercise!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;