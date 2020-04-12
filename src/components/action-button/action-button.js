import React, { Component } from "react";

class ActionButton extends Component {
  
  setButtonTheme(theme) {
    if(theme === "dark") {
      return "action-button dark";
    } else if(theme === "light") {
      return "action-button light";
    } else {
      return "action-button transparent";
    }
  }

  render() {
    return (
      <div className="row-centered">
        <div
          onClick={this.props.theme === 'dark' ? this.props.onClick : null}
          className={this.setButtonTheme(this.props.theme)}
          tabIndex="0"
          role="button"
          aria-pressed="false"
        >
          {this.props.label}
        </div>
      </div>
    );
  }

}

export default ActionButton;
