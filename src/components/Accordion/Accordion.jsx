import Accordion from 'react-bootstrap/Accordion';
import "bootstrap/dist/css/bootstrap.min.css";

export const bootstrapAccordion =({name}) => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{name}</Accordion.Header>
        <Accordion.Body>
       
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

