import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import Tracker from "../tracker/tracker";
import ActionButton from 'components/action-button/action-button';
import mainActions from 'redux/actions/main';
import Messages from 'messages/messages_en';
import userInputActions from 'redux/actions/userInput';

class Header extends Component {

  constructor(props){
    super(props);
    this.playAgain = this.playAgain.bind(this);
  }

  calculatePercentage() {
    let offset = .1
    let total = 0;
    let i = 0
    for(let key in this.props.userInput) {
      total += 1 + offset;
      if(i % 3 == 0) {
        offset -= .04;
      } else {
        offset += .04;
      }
      i++;
    }
    return (total / this.props.mainState.questions.length) * 100;
  }

  playAgain() {
    this.props.setMainState({page: "intro", currentQuestion: 0, trackerQuestion: null});
    this.props.resetUserInput();
  }

  render() {
    return (
      <Fragment>
        <div className="sticky-header-spacer" />
          <div className="header navbar fixed-top">
            <div className="container-fluid">
                <Col className="p-0"></Col>
                <Col xs="12" md="10" className={"px-md-0 " + (this.props.mainState.page === "results" ? "d-block" : "d-none")}>
                  <ActionButton theme="dark" onClick={this.playAgain} label={Messages.PLAY_AGAIN_BTN_LBL}/>
                </Col>
                <Col xs="12" md="10" className={"px-md-0 " + (this.props.mainState.page === "questions" ? "d-block" : "d-none")}>
                  <Tracker goToQuestion={this.goToQuestion} value={this.calculatePercentage()}/>
                </Col>
                <Col className="p-0"></Col>
            </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ ...state });

const mapDispatchToProps = dispatch => {
  return {
    resetUserInput: userInputActions.resetState,
    setMainState: mainActions.setState
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
