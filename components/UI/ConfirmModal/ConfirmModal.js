import { Button, Modal } from "rsuite";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Title>Jeste li sigurni</Modal.Title>
      <Modal.Footer>
        <Button onClick={onClose}>Ne</Button>
        <Button onClick={onConfirm}>Da</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
