import React, { Component, Fragment } from 'react';
import Messages from 'messages/messages_en';
import { Row, Col } from 'reactstrap';

class LoadingPage extends Component {

  render() {
    return (
      <Row className="d-flex question-container">
        <Col sm="12" className="px-5 row-centered">
           <h1>{Messages.LOADING_TRIVIA_TITLE}</h1>
        </Col>
      </Row>
    );
  }

}

export default LoadingPage;
