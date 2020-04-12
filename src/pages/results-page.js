import React, { Component, Fragment } from 'react';
import Messages from 'messages/messages_en';
import { Row, Col } from 'reactstrap';
import ActionButton from 'components/action-button/action-button';
import mainActions from 'redux/actions/main';
import { connect } from 'react-redux';
import { X, Check } from 'react-feather';
import userInputActions from 'redux/actions/userInput';

class ResultsPage extends Component {

  constructor(props) {
    super(props);
    this.playAgain = this.playAgain.bind(this);
  }

  correctQuestions() {
    let total = 0;
    for(let key in this.props.userInput) {
      if(this.props.userInput[key].name === this.props.mainState.questions[key].correct_answer) {
        total++;
      }
    }
    return total;
  }

  getResult(ind) {
    if(this.props.userInput[ind].name === this.props.mainState.questions[ind].correct_answer) {
      return (
        <div>
          <span className="text-success"> <Check size={20}/> {Messages.CORRECT_TXT}</span>
          &nbsp;{Messages.YOU_ANSWERED_TXT} <span className="answer-choice">{this.props.userInput[ind].name}</span>.
        </div>
      );
    }
    return (
      <div>
        <span className="text-danger"><X size={20}/> {Messages.INCORRECT_TXT}</span>
        &nbsp;{Messages.YOU_ANSWERED_TXT} <span className="answer-choice">{this.props.userInput[ind].name}</span>.
      </div>
    );
  }

  renderResults() {
    return this.props.mainState.questions.map((question, ind) =>
      <div className="result">
        <div key={"question" + ind}
        className="result-question"
        dangerouslySetInnerHTML={{ __html: "<span style='font-weight: 500'>" + (ind + 1) + ".)</span> " + question.question}}>
        </div>
        {this.getResult(ind)}
      </div>
    );
  }

  playAgain() {
    this.props.setMainState({page: "intro", currentQuestion: 0, trackerQuestion: null});
    this.props.resetUserInput();
  }

  render() {
    return (
      <Row className="d-flex">
        <Col sm="12" className="px-5 mt-5">
           <h1>{Messages.YOU_SCORED_TXT} <br/> {this.correctQuestions() + "/" + this.props.mainState.questions.length}</h1>
        </Col>
        <Col sm="12" className="px-5 row-centered">
          <div className="results-container p-5">
            {this.renderResults()}
          </div>
        </Col>
        <Col xs="12" className="px-5 mt-4 mb-5 row-centered">
          <ActionButton
            theme="dark"
            onClick={this.playAgain}
            label={Messages.PLAY_AGAIN_BTN_LBL}/>
        </Col>
      </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
