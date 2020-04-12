import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ChevronLeft } from 'react-feather';
import Header from "components/header/header";
import QuestionsPage from "./questions-page";
import IntroPage from "./intro-page";
import LoadingPage from "./loading-page";
import ResultsPage from "./results-page";
import APIService, { DOMAIN } from "api-service/api-service.js";
import userInputActions from 'redux/actions/userInput';

class MainPage extends Component {

  constructor(props) {
    super(props);
  }

  renderPage() {
    switch (this.props.mainState.page) {
      case "": {
        return <LoadingPage/>
        break;
      }
      case "intro": {
        return <IntroPage/>
        break;
      }
      case "questions": {
        return <QuestionsPage/>
        break;
      }
      case "results": {
        return <ResultsPage/>
        break;
      }
      default: return;
    }
  }

  render() {

    return (
      <Fragment>
        <Header/>
        {this.renderPage()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ ...state });

const mapDispatchToProps = dispatch => {
  return {
    setUserInput: userInputActions.setState,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
