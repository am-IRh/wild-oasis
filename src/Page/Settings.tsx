import UpdateSettings from "../Features/settings/UpdateSettings";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettings />
    </Row>
  );
}
