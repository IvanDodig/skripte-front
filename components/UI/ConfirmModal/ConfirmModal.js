import { Button, Modal } from "rsuite";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const ConfirmModal = ({ show, onClose, onConfirm, loading }) => {
  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Title>Jeste li sigurni</Modal.Title>
      <Modal.Footer>
        <Button onClick={onClose}>Ne</Button>
        <Button onClick={onConfirm} color="blue" appearance="primary">
          {loading ? <LoadingScreen /> : "Da"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
