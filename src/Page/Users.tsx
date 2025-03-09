import SignupForm from "../Features/auth/SignupForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Users = () => {
  return (
    <Row>
      <Heading as="h1">Users</Heading>
      <SignupForm />
    </Row>
  );
};
export default Users;
