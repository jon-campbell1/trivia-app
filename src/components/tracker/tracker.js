import React, { Component, Fragment } from "react";
import { Check } from "react-feather";
import { Progress } from "reactstrap";
import { connect } from 'react-redux';
import mainActions from 'redux/actions/main';

class Tracker extends Component {

  goToQuestion(ind) {
    if(ind != this.props.mainState.currentQuestion && this.isCompleted(ind)) {
      this.props.setMainState({trackerQuestion: ind});
    }
  }

  showCheckMark = (ind) => {
    return (
      this.props.value >= ((ind + 1) * (100 / this.props.mainState.questions.length))
      && this.props.mainState.currentQuestion !== ind
      && !(this.props.value > 99 && Object.keys(this.props.userInput).length < this.props.mainState.questions.length && ind === this.props.mainState.questions.length - 1)
    );
  }

  isCompleted = (ind) =>{
    return this.props.value >= (ind * (100 / this.props.mainState.questions.length)) || this.props.mainState.currentQuestion >= ind;
  }

  isActive = (ind) => {
    return this.props.mainState.currentQuestion === ind;
  }

  renderSteps() {
    return (
      <div className="progress-stepper-container">
        <div className="progress-container-inner">
            {this.props.mainState.questions.map((question, ind) => (
              <Fragment key={"step:" + ind}>
                <div onClick={() => {this.goToQuestion(ind)}} className={ "progress-stepper-circle" + (this.isCompleted(ind) ? " complete " : "") + (this.isActive(ind) ? " active " : "") } >
                  <span className={"step-number " + (this.showCheckMark(ind) ? "d-none" : "")}>{ind + 1}</span>
                    <Check name="Checkmark" className={ "progress-check check-mark " + (this.showCheckMark(ind) ? "" : "d-none") } />
                </div>
              </Fragment>
            ))}
            <Progress value={this.props.value} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <Fragment >
         {this.renderSteps()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ ...state });

const mapDispatchToProps = dispatch => {
  return {
    setMainState: mainActions.setState
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
