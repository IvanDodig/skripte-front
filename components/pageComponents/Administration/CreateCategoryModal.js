import { useContext, useState } from "react";
import { Button, Form, Modal, Rate } from "rsuite";
import { AuthContext } from "../../../contexts/AuthContext";
import { categoryServices } from "../../../services/categoryServices";
import { scriptReviewServices } from "../../../services/scriptReviewsServices";
const CreateCategoryModal = ({ show, onClose, setUpdate }) => {
  const { loginUser } = useContext(AuthContext);
  const [formValues, setFormValues] = useState();

  const onConfirm = async () => {
    console.log(formValues);
    await categoryServices.createCategory(formValues);
    onClose();
    setUpdate(new Date());
  };

  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Title>Dodaj novu kategoriju</Modal.Title>
      <Form onChange={values => setFormValues(values)}>
        <Modal.Body style={{ textAlign: "center" }}>
          <Form.Group controlId="name">
            <Form.ControlLabel>Naziv</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Odustani</Button>
          <Button onClick={onConfirm}>Dodaj</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateCategoryModal;
