import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import APIService from 'api-service/api-service';
import { Row, Col } from 'reactstrap';
import userInputActions from 'redux/actions/userInput';

class RadioSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    }
  }

  componentDidMount() {

  }

  select(selectedIndex) {
    this.setState({
      selectedIndex
    }, () => {
      this.createUpdatedUserInputObj();
    });
  }

  createUpdatedUserInputObj() {
    let questionAnswerPair = {};
    questionAnswerPair[this.props.questionNumber] = this.props.options[this.state.selectedIndex];
    this.props.setUserInput({...questionAnswerPair});
    if(this.props.questionNumber < this.props.mainState.questions.length - 1) {
      this.props.onChange();
    }
  }

  isSelected(option) {
    return this.props.userInput[this.props.questionNumber] && this.props.userInput[this.props.questionNumber].name === option.name;
  }

  isNotSelected(option) {
    return this.props.userInput[this.props.questionNumber] && this.props.userInput[this.props.questionNumber].name !== option.name;
  }

  radioOptions() {
    return this.props.options.map((option, i) =>
      <div key={"option:" + i} onClick={() => {this.select(i)}} className={"radio-option-box " + (this.isSelected(option) ? "selected" : this.isNotSelected(option) ? "not-selected" : "")}>
        <div className={"option-label " + (this.isSelected(option) ? "selected" : "")}>
          {option.name}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="relative-wrapper row-centered">
        <div className="radio-options-container d-flex justify-content-between">
          {this.radioOptions()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({...state});

const mapDispatchToProps = dispatch => {
  return {
    setUserInput: userInputActions.setState
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RadioSelect);
