import React, { Component } from 'react';
import { ChevronUp } from 'react-feather';
import Messages from 'messages/messages_en';

class PreviousQuestionText extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="row-centered">
          <ChevronUp size={18} color="#125d77"/>
          <div className="prev-question-txt" onClick={this.props.onClick}>{Messages.PREVIOUS_QUESTION_TXT}</div>
        </div>
    );
  }

}

export default PreviousQuestionText
