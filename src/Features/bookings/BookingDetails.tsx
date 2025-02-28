import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import type { BookingType } from "../../service/apiBookings";

import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Modal from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "../check-in-out/useDeleteBooking";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName: Record<BookingType["status"], string> = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleting, isPending } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/check/${bookingId}`)}>Check in</Button>
        )}

        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkOut(bookingId)}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            {({ onClick }) => (
              <Button $variation="danger" onClick={onClick}>
                Delete
              </Button>
            )}
          </Modal.Open>
          <Modal.Window name="delete">
            {({ onCloseModal }) => (
              <ConfirmDelete
                disabled={isPending}
                closeModal={() => onCloseModal()}
                onConfirm={() => deleting(bookingId, { onSettled: () => navigate(-1) })}
                resource="delete"
              />
            )}
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
