import Farm from "./component/memo&reduce/Farm";
import Age from "./component/callback/Age";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  return (
    <>
      <Container fluid="md">
        {/* <Age data={{ length: 600, max: 70, min: 21 }} /> */}
        <Farm />
      </Container>
    </>
  );
}

export default App;
