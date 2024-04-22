import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../styles/History.css';

import { fetchCategories, getExercise, getExercises } from '../utils/API';
import Auth from '../utils/auth';
import { getSavedBookIds, saveBookIds } from '../utils/localStorage';
import { SAVE_EXERCISE } from '../utils/mutations';

const SearchBooks = () => {
  // create state for holding returned api data
  const [exercisesList, setExercisesList] = useState([]);
  const [selectedExercise, setExercise] = useState('');
  const [exerciseInfo, setExerciseInfo] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState([]);
  const [userId, setUserId] = useState('');

  const [saveExercise, { data, error }] = useMutation(SAVE_EXERCISE);

  useEffect(() => {
    if (Auth.loggedIn()) {
      const {
        data: { _id },
      } = Auth.getProfile();
      setUserId(_id);
      setSavedBookIds(getSavedBookIds(_id));
    }
  }, []);

  useEffect(() => {
    saveBookIds(savedBookIds, userId);
  }, [savedBookIds]);

  useEffect(() => {
    getCategories();
  }, []);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await getExercises(selectedCategory);

      setExercisesList(JSON.parse(await response.text()));
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

  // create function to handle saving a book to our database
  const handleSaveBook = async (exerciseId) => {
    if (!userId) {
      return false;
    }

    try {
      await saveExercise({
        variables: {
          categoryName: exerciseInfo.bodyPart,
          exerciseId,
          title: exerciseInfo.name,
          instructions: exerciseInfo.instructions,
          equipment: [exerciseInfo.equipment],
          image: exerciseInfo.gifUrl,
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
    <div className="con-bg2 find-cont">
      <Container className="cat-search-cont">
        <div>
          <Container className="">
            <h1 className="cat-name">Select Category</h1>

            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Select
                    name="searchInput"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    size="lg"
                    aria-label="Select a category"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    {/* Add more options as needed */}
                  </Form.Select>
                </Col>
                <Col xs={12} md={4}>
                  <Button type="submit" variant="warning" size="lg">
                    Get Exerices
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>

        {exercisesList.length > 0 && (
          <div className="">
            <Container className="">
              <h1 className="cat-name">Select Exercise</h1>
              <Form onSubmit={handleFormSubmitExercise}>
                <Row>
                  <Col xs={12} md={8}>
                    <Form.Select
                      name="searchInput"
                      value={selectedExercise}
                      onChange={(e) => setExercise(e.target.value)}
                      size="lg"
                      aria-label="Select exercise"
                    >
                      <option value="">Select exercise</option>
                      {exercisesList.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                          {exercise.name}
                        </option>
                      ))}
                      {/* Add more options as needed */}
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={4}>
                    <Button type="submit" variant="warning" size="lg">
                      Get Exercise info
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
        )}

        <div className="test">
          <Container className=" ">
            <h2 className="pt-3 cat-name">
              {exerciseInfo ? `Viewing results:` : 'Choose excercise you want'}
            </h2>
            <Row className="row-ex">
              {/* Map through exercisesList to render exercise cards */}
              {exercisesList.map((exerciseInfo) => (
                <Col md="4" key={exerciseInfo.id} className="col-test">
                  <Card className="exercise-card" border="dark">
                    {exerciseInfo.gifUrl ? (
                      <Card.Img
                        src={exerciseInfo.gifUrl}
                        alt={`The cover for ${exerciseInfo.name}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title className="exercise-name">
                        {exerciseInfo.name}
                      </Card.Title>
                      <p className="small">Category: {exerciseInfo.bodyPart}</p>
                      <p className="small">
                        Equipment: {exerciseInfo.equipment}
                      </p>
                      <p className="small">Target: {exerciseInfo.target}</p>
                      <p className="small">Instructions:</p>
                      <ul className="instructions-list">
                        {exerciseInfo.instructions
                          ? exerciseInfo.instructions.map(
                              (instruction, index) => (
                                <li key={index}>{instruction}</li>
                              )
                            )
                          : null}
                      </ul>
                      <p className="small">Secondary Muscles:</p>
                      <ul className="secondary-muscles-list">
                        {exerciseInfo.secondaryMuscles
                          ? exerciseInfo.secondaryMuscles.map(
                              (muscle, index) => <li key={index}>{muscle}</li>
                            )
                          : null}
                      </ul>
                      {/* <Card.Text>{exerice.description}</Card.Text> */}
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedBookIds?.some(
                            (savedBookId) => savedBookId === exerciseInfo.id
                          )}
                          className="btn-block btn-warning"
                          onClick={() => handleSaveBook(exerciseInfo.id)}
                        >
                          {savedBookIds?.some(
                            (savedBookId) => savedBookId === exerciseInfo.id
                          )
                            ? 'This Exercise has already been saved!'
                            : 'Save this Exercise!'}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default SearchBooks;
