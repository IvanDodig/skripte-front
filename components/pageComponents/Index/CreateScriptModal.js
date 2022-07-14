import { useContext, useState } from "react";
import { Button, SelectPicker, Form, Modal, Uploader } from "rsuite";
import { AuthContext } from "../../../contexts/AuthContext";
import { scriptServices } from "../../../services/scriptServices";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";

const CreateScriptModal = ({ show, onClose, categories }) => {
  const [formValues, setFormValues] = useState();
  const { loginUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = () => {
    setIsLoading(true);
    scriptServices
      .createScript({ ...formValues, creator_id: loginUser?.id || 1 })
      .then(res => {
        setIsLoading(false);
        onClose();
      })
      .catch(err => {
        setIsLoading(false);
        onClose();
      });
  };
  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Title>Dodaj novu skriptu</Modal.Title>
      <Form onChange={values => setFormValues(values)}>
        <Modal.Body style={{ textAlign: "center", overflow: "none" }}>
          <Form.Group controlId="title">
            <Form.ControlLabel>Naziv skripte</Form.ControlLabel>
            <Form.Control name="title" />
          </Form.Group>
          <Form.Group controlId="desctiption">
            <Form.ControlLabel>Opis</Form.ControlLabel>
            <Form.Control name="description" />
          </Form.Group>
          <Form.Group controlId="category_id">
            <Form.ControlLabel>Kategorija</Form.ControlLabel>
            <Form.Control
              name="category_id"
              accepter={SelectPicker}
              data={categories.map(x => {
                return {
                  label: x.name,
                  value: x.id,
                  role: x.id,
                };
              })}
            />
          </Form.Group>
          <Form.Group controlId="script">
            <Form.ControlLabel>Skripta</Form.ControlLabel>
            <Form.Control name="script" accepter={Uploader} />
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

export default CreateScriptModal;
