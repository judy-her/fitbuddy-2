import { useState, useEffect, useId } from 'react';
import { useMutation } from "@apollo/client";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { fetchCategories,getExercises,getExercise } from '../utils/API';

import { ADD_EXERCISE } from "../utils/mutations";

const SearchExercises = () => {
  // create state for holding returned google api  data
  // const [searchedBooks, setSearchedBooks] = useState([]);
  const [exercisesList, setExercisesList] = useState([]);
  const [selectedExercise, setExercise] = useState('');
  const [exerciseInfo, setExerciseInfo] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // create state for holding our search field data
  // const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedExerciseIds, setSavedExerciseIds] = useState([]);
  const [userId, setUserId] = useState('');

  const [saveExercise, { data,error }] = useMutation(ADD_EXERCISE);

  useEffect(() => {
    if (Auth.loggedIn()) {
      const {data: {_id}} = Auth.getProfile();
      setUserId(_id);
      // setSavedExerciseIds(getSavedBookIds(_id));
    }
  }, []);

  // useEffect(() => {
  //   saveBookIds(savedBookIds, userId);
  // }, [savedBookIds]);  
  
  useEffect(() => {
    getCategories();
  }, []);


  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await getExercises(selectedCategory);

      setExercisesList(JSON.parse(await response.text()));
      // setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleFormSubmitExercise = async (event) => {
    event.preventDefault();

    try {
      const response = await getExercise(selectedExercise);
      setExerciseInfo(JSON.parse(await response?.text()));
    } catch (err) {
      console.error(err);
    }
  };

  // // create function to handle saving a book to our database
  // const handleSaveBook = async (exerciseId) => {
  //   // find the book in `searchedBooks` state by the matching id
  //   const bookToSave = exerciseInfo.find((exercise) => exercise.exerciseId === exerciseId);

  //   if (!userId) {
  //     return false;
  //   }

  //   try {
  //     // const response = await saveBook(bookToSave, token);
  //     await saveExercise({
  //       variables: { ...bookToSave },
  //     });

  //     // if book successfully saves to user's account, save book id to state
  //     // setSavedBookIds([...savedBookIds, bookToSave.bookId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSaveBook = async (exerciseId) => {

    if (!userId) {
      return false;
    }

    try {
      await saveExercise({
        variables: { 
          bodyPart:exerciseInfo.bodyPart, 
          exerciseId, 
          name: exerciseInfo.name, 
          instructions: [exerciseInfo.instructions], 
          equipment:exerciseInfo.equipment, 
          gifUrl: exerciseInfo.gifUrl
         },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getCategories = async () => {
    const response = await fetchCategories();
    setCategories(JSON.parse(await response?.text()));
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
                    <option key={category} value={category}>
                      {category}
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
                <Card className='exercise-card' border='dark'>
                  {exerciseInfo.gifUrl ? (
                    <Card.Img src={exerciseInfo.gifUrl} alt={`The cover for ${exerciseInfo.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title className='exercise-name'>{exerciseInfo.name}</Card.Title>
                    <p className='small'>Category: {exerciseInfo.bodyPart}</p>
                    <p className='small'>Equipment: {exerciseInfo.equipment}</p>
                    <p className='small'>Target: {exerciseInfo.target}</p>
                    <p className='small'>Instructions:</p>
                    <ul className='instructions-list'>
                    {exerciseInfo.instructions? exerciseInfo.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    )): null}
                   </ul>
                   <p className='small'>Secondary Muscles:</p>
                  <ul className='secondary-muscles-list'>
                    {exerciseInfo.secondaryMuscles? exerciseInfo.secondaryMuscles.map((muscle, index) => (
                      <li key={index}>{muscle}</li>
                    )): null}
                  </ul>
                    {/* {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === exerciseInfo.id)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(exerciseInfo.id)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === exerciseInfo.id)
                          ? 'This Exercise has already been saved!'
                          : 'Save this Exercise!'}
                      </Button>
                    )}  */}
                  </Card.Body>
                </Card>
              </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchExercises;