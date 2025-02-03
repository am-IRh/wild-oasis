import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinFrom";

function AddCabinBtn() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          {({ onClick }) => <Button onClick={onClick}>Add new cabin</Button>}
        </Modal.Open>
        <Modal.Window name="cabin-form">
          {({ onCloseModal }) => <CreateCabinForm onCloseModal={onCloseModal} />}
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabinBtn;
