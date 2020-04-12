import React, { Component, Fragment } from 'react';
import Messages from 'messages/messages_en';
import PreviousQuestionText from "components/previous-question-text/previous-question-text";
import AnswerOptions  from 'components/answer-options/answer-options';
import ActionButton from 'components/action-button/action-button';
import { connect } from 'react-redux';
import scrollToComponent from 'react-scroll-to-component';
import { Row, Col } from 'reactstrap';
import userInputActions from 'redux/actions/userInput';
import mainActions from 'redux/actions/main';
import { ANSWER_CHOICES } from 'constants/answer-choices';

class QuestionsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewState: [{value: 0}],
      trackerQuestion: null
    }
  }
  componentDidMount() {
    this.listenForTrackerQuestion();
  }

  listenForTrackerQuestion() {
    if(this.props.mainState.trackerQuestion != null && this.props.mainState.trackerQuestion != this.state.trackerQuestion) {
      console.log(this.props.mainState.trackerQuestion);
      this.setState({
        trackerQuestion: this.props.mainState.trackerQuestion
      }, () => {
        if(this.state.trackerQuestion < this.props.mainState.currentQuestion) {
          this.initChangeView(this.state.trackerQuestion, true);
          return;
        }
        this.initChangeView(this.state.trackerQuestion);
      });
    }
    setTimeout(() => {
      this.listenForTrackerQuestion();
    }, 50);
  }

  initChangeView(ind, prev = false) {
    let viewState = [];
    viewState = [this.state.viewState[0], {value: ind}];
    this.changeView(viewState, prev);
  }

  changeView(viewState, prev = false) {
    this.setState({viewState}, () => {
      let offset = -90;
      if(prev) {
        window.scrollTo(0, window.innerHeight / 2);
        offset = -150;
      }
      this.props.setMainState({currentQuestion: viewState[1].value})
      scrollToComponent(this[viewState[1].value],  { offset, align: 'top', duration: 500});
      setTimeout(() => {
        if(window.innerWidth <= 768) {
          let scrollTop = 23;
          if(viewState[1].value === 0) {
            scrollTop = 0;
          }
          setTimeout(() => {
            window.scrollTo(0, scrollTop);
          }, 5);
        }
        viewState.shift();
        this.setState({viewState});
      }, 525);
    });
  }

  isShowingQuestion(ind) {
    return this.state.viewState.filter(viewObj => viewObj.value === ind).length;
  }

  render() {

    return (
      <Fragment>
        {this.props.mainState.questions.map((question, ind) => (
            <div ref={(section) => { this[ind] = section; }} className={(this.isShowingQuestion(ind) ? "" : "d-none")} key={"question" + ind}>
              <div className={"mt-5 " + (ind === 0 ? "d-none" : "")}>
                <PreviousQuestionText onClick={() => this.initChangeView(ind - 1, true)}/>
              </div>
              <Row className={"d-flex question-container " + (ind === 0 ? "adjust-space" : "")}>
                <Col sm="12">
                  <Row className="row-centered">
                    <Col xs="12" className="px-5 row-centered">
                      <h1>{question.category}</h1>
                    </Col>
                    <Col xs="12" className="px-5 mt-4 row-centered">
                      <h2 dangerouslySetInnerHTML={{ __html: question.question}}></h2>
                      <div className="mt-3">
                        <AnswerOptions options={ANSWER_CHOICES} onChange={() => {this.initChangeView(ind + 1)}} questionNumber={ind}/>
                      </div>
                    </Col>
                    <Col xs="12" className="px-5 mt-4 row-centered">
                      <h3>{this.props.mainState.currentQuestion + 1 > 10 ? 10 : this.props.mainState.currentQuestion + 1} of {this.props.mainState.questions.length}</h3>
                    </Col>
                    <Col xs="12" className={"mt-4 " + (this.props.mainState.currentQuestion === this.props.mainState.questions.length - 1 ? "d-block" : "d-none")}>
                      <ActionButton
                        theme={this.props.userInput[ind] ? "dark" : "light"}
                        onClick={() => {this.props.setMainState({page: "results"})}}
                        label={Messages.VIEW_RESULTS_BTN_LBL}/>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          ))}
        </Fragment>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({ ...state });

const mapDispatchToProps = dispatch => {
  return {
    setUserInput: userInputActions.setState,
    setMainState: mainActions.setState
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
