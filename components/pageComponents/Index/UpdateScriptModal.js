import { useContext, useEffect, useState } from "react";
import { Button, SelectPicker, Form, Modal, Uploader } from "rsuite";
import { AuthContext } from "../../../contexts/AuthContext";
import { scriptServices } from "../../../services/scriptServices";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";

const UpdateScriptModal = ({ show, onClose, categories, data }) => {
  const [formValues, setFormValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const onConfirm = () => {
    setIsLoading(true);
    scriptServices
      .updateScript(data?.id, { ...formValues })
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
      <Modal.Title>Uredi skriptu</Modal.Title>
      <Form onChange={values => setFormValues(values)}>
        <Modal.Body style={{ textAlign: "center", overflow: "none" }}>
          <Form.Group controlId="title">
            <Form.ControlLabel>Naziv skripte</Form.ControlLabel>
            <Form.Control name="title" defaultValue={data?.title} />
          </Form.Group>
          <Form.Group controlId="desctiption">
            <Form.ControlLabel>Opis</Form.ControlLabel>
            <Form.Control name="description" defaultValue={data?.description} />
          </Form.Group>
          <Form.Group controlId="category_id">
            <Form.ControlLabel>Kategorija</Form.ControlLabel>
            <Form.Control
              name="category_id"
              accepter={SelectPicker}
              defaultValue={data?.category_id}
              data={categories.map(x => {
                return {
                  label: x.name,
                  value: x.id,
                  role: x.id,
                };
              })}
            />
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

export default UpdateScriptModal;
