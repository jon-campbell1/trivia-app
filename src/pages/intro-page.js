import React, { Component, Fragment } from 'react';
import Messages from 'messages/messages_en';
import ActionButton from 'components/action-button/action-button';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import userInputActions from 'redux/actions/userInput';
import mainActions from 'redux/actions/main';

class IntroPage extends Component {

  render() {
    return (
      <Row className="d-flex question-container">
        <Col sm="12">
          <Row className="row-centered">
            <Col xs="12" className="px-5 row-centered">
              <h1>{Messages.WELCOME_TITLE}</h1>
            </Col>
            <Col xs="12" className="px-5 mt-4 row-centered">
              <h2>{Messages.INTRO_MSG1.replace("{0}", this.props.mainState.questions.length)}</h2>
              <div className="mt-3">
                <h3>{Messages.INTRO_MSG2}</h3>
              </div>
            </Col>
            <Col xs="12" className="mt-3">
              <ActionButton
                theme="dark" label={Messages.BEGIN_BTN_LBL}
                onClick={() => {
                  this.props.setMainState({page: "questions"})
                }}/>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({ ...state });

const mapDispatchToProps = dispatch => {
  return {
    setUserInput: userInputActions.setState,
    setMainState: mainActions.setState
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroPage);
