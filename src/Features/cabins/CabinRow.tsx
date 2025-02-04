import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import type { CabinType } from "../../service/apiCabins";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinFrom";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
    <TableRow role="row">
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
            <Modal.Open opens="edit">
              {({ onClick }) => (
                <button disabled={isPending} type="button" onClick={onClick}>
                  <HiPencil />
                </button>
              )}
            </Modal.Open>
            <Modal.Window name="edit">
              {({ onCloseModal }) => (
                <CreateCabinForm cabinToEdit={cabin} onCloseModal={onCloseModal} />
              )}
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens="delete">
              {/* onClick={() => mutate(cabinId)} */}
              {({ onClick }) => (
                <button disabled={isPending} type="button" onClick={onClick}>
                  <HiTrash />
                </button>
              )}
            </Modal.Open>
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
          </Modal>
          <button disabled={isPending} type="button" onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
        </div>
      )}
    </TableRow>
  );
};
export default CabinRow;
