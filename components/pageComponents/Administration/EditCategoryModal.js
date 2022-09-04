import { useContext, useState } from "react";
import { Button, Form, Modal, Rate } from "rsuite";
import { AuthContext } from "../../../contexts/AuthContext";
import { categoryServices } from "../../../services/categoryServices";
import { scriptReviewServices } from "../../../services/scriptReviewsServices";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
const EditCategoryModal = ({ show, onClose, setUpdate, data }) => {
  const { loginUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    setIsLoading(true);
    await categoryServices.editCategory(data?.id, formValues);
    onClose();
    setIsLoading(false);
    setUpdate(new Date());
  };

  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Title>Dodaj novu kategoriju</Modal.Title>
      <Form onChange={values => setFormValues(values)}>
        <Modal.Body style={{ textAlign: "center", overflow: "hidden" }}>
          <Form.Group controlId="name">
            <Form.ControlLabel>Naziv</Form.ControlLabel>
            <Form.Control name="name" defaultValue={data?.name} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Odustani</Button>
          <Button appearance="primary" onClick={onConfirm}>
            {isLoading ? <LoadingScreen /> : "Spremi"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
