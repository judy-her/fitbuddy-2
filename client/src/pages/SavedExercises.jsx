import { useQuery, useMutation } from "@apollo/client";
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { QUERY_USER } from "../utils/queries";
import { DELETE_EXERCISE } from "../utils/mutations";
import Auth from '../utils/auth';

const SavedExercises = () => {
  const { loading, data } = useQuery(QUERY_USER,{fetchPolicy:'cache-and-network'});
  const userData = data?.user||{};

  console.log(userData);

  const [deleteExercise, { error }] = useMutation(DELETE_EXERCISE, {
    refetchQueries: [QUERY_USER],
  });

  const handleDeleteExercise = async (exerciseId) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      const { data } = await deleteExercise({
        variables: {id:exerciseId}
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
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved exercises!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData?.savedExercises.length
            ? `Viewing ${userData?.savedExercises?.length??0} saved exercise(s):`
            : 'You have no saved exercises!'}
        </h2>
        <Row>
          {userData?.savedExercises.map((exercise) => {
            return (
              <Col md="4" key={exercise._id}>
                <Card border='dark'>
                  {exercise.image ? <Card.Img src={exercise.image} alt={`The cover for ${exercise.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{exercise.name}</Card.Title>
                    <p>Instructions:</p>
                    <ul>{exercise.instructions.map((instruction,index)=>(<li key={index}>{instruction}</li>))}</ul>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteExercise(exercise._id)}>
                      Delete this exercise!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedExercises;