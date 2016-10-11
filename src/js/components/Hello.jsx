import React, { PropTypes, Component } from 'react';

import HelloForm from './HelloForm';

const propTypes = {
  text: PropTypes.string.isRequired,
}

class Hello extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Todo Management
        <HelloForm text={this.props.text}/>
        Todo: {this.props.text}
      </div>
    )
  }
}

Hello.propTypes = propTypes;
export default Hello;
