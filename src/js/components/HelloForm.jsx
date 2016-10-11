import React, { PropTypes, Component } from 'react';

import HelloActions from '../actions/HelloActions';

const propTypes = {
  text: PropTypes.string.isRequired,
}

class Hello extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  _onSubmit(e) {
    e.preventDefault();
    HelloActions.updateText(this.state.text);
    this.setState({text: ''});
  }

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <input
          value={this.state.text}
          type="text"
          placeholder="いま何してる？"
          onChange={this._onChange}
        />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

Hello.propTypes = propTypes;
export default Hello;
