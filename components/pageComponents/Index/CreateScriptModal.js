import { useState } from "react";
import { Button, SelectPicker, Form, Modal, Uploader } from "rsuite";
import { scriptServices } from "../../../services/scriptServices";

const CreateScriptModal = ({ show, onClose, categories }) => {
  const [formValues, setFormValues] = useState();

  const onConfirm = () => {
    console.log(formValues);
    scriptServices
      .createScript({ ...formValues, creator_id: 1 })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Title>Dodaj novu skriptu</Modal.Title>
      <Form onChange={values => setFormValues(values)}>
        <Modal.Body style={{ textAlign: "center" }}>
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
          <Button onClick={onConfirm}>Dodaj</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateScriptModal;
