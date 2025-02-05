import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import type { CabinType } from "../../service/apiCabins";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinFrom";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: CabinType;
}
const CabinRow = ({ cabin }: CabinRowProps) => {
  // Custom hooks to handle deletion and duplication actions
  const { isPending: isDelete, mutate } = useDeleteCabin();
  const { isPending: isDuplicate, mutate: DuplicateMutate } = useCreateCabin();

  // Determine if any mutation is currently pending
  const isPending = isDelete || isDuplicate;

  const { id: cabinId, name, maxCapacity, regularPrice, discount, imageUrl } = cabin;

  // Duplicate
  function handleDuplicate() {
    DuplicateMutate({
      newCabinData: {
        name,
        maxCapacity,
        regularPrice,
        discount,
        imageUrl: imageUrl || "",
      },
    });
  }
  return (
    <Table.Row>
      <Img src={imageUrl || ""} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      {isPending ? (
        <Spinner type="small" />
      ) : (
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId.toString()} />
              <Menus.List id={cabinId.toString()}>
                <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  {({ onClick }) => (
                    <Menus.Button icon={<HiPencil />} onClick={onClick}>
                      Edit
                    </Menus.Button>
                  )}
                </Modal.Open>
                <Modal.Open opens="delete">
                  {({ onClick }) => (
                    <Menus.Button icon={<HiTrash />} onClick={onClick}>
                      Delete
                    </Menus.Button>
                  )}
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                {({ onCloseModal }) => (
                  <CreateCabinForm cabinToEdit={cabin} onCloseModal={onCloseModal} />
                )}
              </Modal.Window>
              <Modal.Window name="delete">
                {({ onCloseModal }) => (
                  <ConfirmDelete
                    disabled={isDelete}
                    closeModal={onCloseModal}
                    onConfirm={() => mutate(cabinId)}
                    resource={name}
                  />
                )}
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      )}
    </Table.Row>
  );
};
export default CabinRow;
