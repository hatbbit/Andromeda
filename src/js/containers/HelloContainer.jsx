import connectToStores from 'alt-utils/lib/connectToStores';
import React, { PropTypes, Component } from 'react';

import HelloStore from '../stores/HelloStore';
import HelloActions from '../actions/HelloActions';
import Hello from '../components/Hello';

const propTypes = {
  text: PropTypes.string.isRequired,
}

class HelloContainer extends Component {
  static getStores() {
    return [HelloStore];
  }

  static getPropsFromStores() {
    return HelloStore.getState();
  }

  render() {
    return (
      <Hello text={this.props.text} />
    )
  }
}

HelloContainer.propTypes = propTypes;
export default connectToStores(HelloContainer);
