// import { useState, useEffect } from 'react' ;
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import '../styles/History.css';

// import { getMe, deleteBook } from '../utils/API';
import { QUERY_USER } from '../utils/queries';
import { DELETE_EXERCISE } from '../utils/mutations';
import Auth from '../utils/auth';

const SavedExercises = () => {
  const { loading, data } = useQuery(QUERY_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const userData = data?.user || {};

  const [deleteExercise, { error }] = useMutation(DELETE_EXERCISE, {
    refetchQueries: [QUERY_USER],
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteExercise = async (exerciseId) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      const { data } = await deleteExercise({
        variables: { id: exerciseId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="con-bg2">
      <Container className="cat-search-cont">
        {/* <h1 className="cat-name">Viewing saved exercises!</h1> */}

        <div className="">
          <h2 className="cat-name">
            {userData?.savedExercises.length
              ? `Viewing ${
                  userData?.savedExercises?.length ?? 0
                } saved exercises:`
              : 'You have no saved exercises!'}
          </h2>
          <Row>
            {userData?.savedExercises.map((exercise) => {
              return (
                <Col md="4" key={exercise._id}>
                  <Card border="dark">
                    {exercise.image ? (
                      <Card.Img
                        src={exercise.image}
                        alt={`Image of ${exercise.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{exercise.title}</Card.Title>

                      <p>Instructions:</p>
                      <ul>
                        {exercise.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ul>

                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteExercise(exercise._id)}
                      >
                        Delete this Exercise!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SavedExercises;
