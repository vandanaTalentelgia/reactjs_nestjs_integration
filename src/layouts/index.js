
import React from 'react';
import Header from '../common/Header';
import { Row,Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
const PublicLayout = (component) => {
  

  return (
    <Container fluid>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className='row-layout'>
        <Col>{component}</Col>
      </Row>
    </Container>

  );
}

export default PublicLayout;
