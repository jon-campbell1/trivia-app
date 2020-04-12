import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import MainPage from "pages/main-page";
import userInputActions from 'redux/actions/userInput';
import mainActions from 'redux/actions/main';
import APIService from "api-service/api-service";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    APIService.getQuestions()
      .then(res => {
        if(res.results) {
          this.props.setMainState({page: "intro", questions: res.results});
        }
      });
  }

  render() {

    return (
      <Fragment>
          <MainPage/>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
