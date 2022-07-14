import { useContext, useState } from "react";
import { Button, Form, Modal, Rate } from "rsuite";
import { AuthContext } from "../../../contexts/AuthContext";
import { scriptReviewServices } from "../../../services/scriptReviewsServices";
import LoadingScreen from "../../../components/UI/LoadingScreen/LoadingScreen";

const AddReviewModal = ({ show, onClose, scriptId }) => {
  const { loginUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState();
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    console.log({
      description: formValues?.title,
      rating,
      reviewer_id: loginUser?.id,
      script_id: +scriptId,
    });
    setIsLoading(true);
    scriptReviewServices
      .createScriptReview({
        description: formValues?.title,
        rating,
        reviewer_id: loginUser?.id,
        script_id: +scriptId,
      })
      .then(res => {
        setIsLoading(false);
        onClose();
      });
    // console.log(formValues);
    // scriptServices
    //   .createScript({ ...formValues, creator_id: 1 })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Title>Ocijeni</Modal.Title>
      <Form onChange={values => setFormValues(values)}>
        <Modal.Body style={{ textAlign: "center", overflow: "none" }}>
          <Form.Group controlId="title">
            <Form.ControlLabel>Komentar</Form.ControlLabel>
            <Form.Control name="title" />
          </Form.Group>

          <Rate
            onChange={x => {
              setRating(x);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Odustani</Button>
          <Button onClick={onConfirm} appearance="primary">
            {isLoading ? <LoadingScreen /> : "Spremi"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddReviewModal;
